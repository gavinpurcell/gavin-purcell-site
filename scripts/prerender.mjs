// Postbuild prerender: serves dist/ with an SPA fallback (mirroring the
// vercel.json rewrite), visits every sitemap route in headless Chrome, and
// writes the hydrated HTML back into dist/ so crawlers and AI search engines
// get real content instead of an empty <div id="root">.
import { createServer } from 'node:http';
import { domToMarkdownSource } from './dom-to-markdown.js';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

// Locally: full puppeteer with its bundled Chrome.
// On Vercel: puppeteer-core + @sparticuz/chromium (a Chromium built to run
// in Amazon Linux build/lambda containers, where puppeteer's own download
// either isn't cached or can't launch for lack of system libraries).
async function launchBrowser() {
  if (process.env.VERCEL) {
    const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
      import('@sparticuz/chromium'),
      import('puppeteer-core'),
    ]);
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { default: puppeteer } = await import('puppeteer');
  return puppeteer.launch({ headless: true });
}

const DIST = new URL('../dist', import.meta.url).pathname;
const PORT = 4517;

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/gavinpurcell\.com([^<]*)<\/loc>/g)]
  .map((m) => m[1] || '/')
  .filter((p) => !/\.(txt|xml|html)$/.test(p));

if (routes.length === 0) {
  console.error('prerender: no routes found in sitemap.xml');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = join(DIST, url);
  if (url === '/' || !existsSync(file) || statSync(file).isDirectory()) {
    file = join(DIST, 'index.html');
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await launchBrowser();
try {
  const page = await browser.newPage();
  // Never let the prerender hit live APIs; the SPA falls back gracefully
  await page.setRequestInterception(true);
  page.on('request', (req) =>
    req.url().includes('/api/') ? req.abort() : req.continue()
  );

  const markdownByRoute = new Map();

  for (const route of routes) {
    // Hand-authored static pages (the unlisted newsletter pages under public/)
    // are already complete HTML and have no React root to wait for. Visiting one
    // would hang on the #root selector until the build times out, so they are
    // listed in the sitemap but skipped here.
    const staticFile = join(DIST, route, 'index.html');
    if (existsSync(staticFile) && !readFileSync(staticFile, 'utf8').includes('id="root"')) {
      console.log(`skipped ${route} (hand-authored static page)`);
      continue;
    }

    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#root > *', { timeout: 10000 });
    // Helmet tags carry data-rh; when a route sets its own canonical/description/
    // og/twitter tags, drop the static duplicates from index.html's head.
    await page.evaluate(() => {
      const identity = (el) =>
        el.tagName === 'LINK'
          ? `link:${el.getAttribute('rel')}`
          : `meta:${el.getAttribute('name') || el.getAttribute('property')}`;
      const managed = new Set(
        [...document.head.querySelectorAll('link[data-rh], meta[data-rh]')].map(identity)
      );
      document.head
        .querySelectorAll('link[rel="canonical"]:not([data-rh]), meta[name]:not([data-rh]), meta[property]:not([data-rh])')
        .forEach((el) => {
          if (managed.has(identity(el))) el.remove();
        });
      // Runtime-injected scripts (Vercel analytics) re-inject on load;
      // baking them into the HTML would duplicate them.
      document
        .querySelectorAll('script[src*="/_vercel/insights"]')
        .forEach((el) => el.remove());
    });
    // Point agents at this page's markdown twin from the HTML itself.
    await page.evaluate((href) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.type = 'text/markdown';
      link.href = href;
      link.title = 'This page as Markdown';
      document.head.appendChild(link);
    }, `${route === '/' ? '' : route}/index.md`);
    const html = await page.content();
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(
      join(outDir, 'index.html'),
      html.startsWith('<!DOCTYPE') || html.startsWith('<!doctype') ? html : '<!doctype html>\n' + html
    );
    // Markdown twin, served to agents that send Accept: text/markdown.
    const md = await page.evaluate(
      (src, canonical) => new Function('return ' + src)()(canonical),
      domToMarkdownSource().toString(),
      `https://gavinpurcell.com${route}`
    );
    writeFileSync(join(outDir, 'index.md'), md);
    markdownByRoute.set(route, md);
    console.log(`prerendered ${route} (${(html.length / 1024).toFixed(0)}KB html, ${(md.length / 1024).toFixed(1)}KB md)`);
  }

  // llms-full.txt: the main pages as one markdown file, built from the same
  // markdown twins the pages serve. It used to be a hand-written summary and
  // went stale within a month; generated, it cannot disagree with the site.
  const posts = JSON.parse(readFileSync(new URL('../src/content/posts.json', import.meta.url), 'utf8'));
  const strip = (html) => html.replace(/<[^>]+>/g, '').trim();
  const fullText = [
    '# Gavin Purcell: full text of gavinpurcell.com',
    '> The main pages of gavinpurcell.com as one Markdown file, generated from the live pages at build time. For the short guide, see https://gavinpurcell.com/llms.txt',
    ...['/', '/about', '/work', '/the-last-invention', '/contact']
      .filter((route) => markdownByRoute.has(route))
      .map((route) => `---\n\n${markdownByRoute.get(route).trim()}`),
    '---',
    '# Writing',
    '> Every post is available in full as Markdown at its URL plus /index.md.',
    posts
      .map((p) => `- [${p.title}](https://gavinpurcell.com/blog/${p.slug}) (${p.date.slice(0, 10)}): ${strip(p.excerpt)}`)
      .join('\n'),
    '',
  ].join('\n\n');
  writeFileSync(join(DIST, 'llms-full.txt'), fullText);
  console.log(`wrote llms-full.txt (${(fullText.length / 1024).toFixed(0)}KB)`);

  // A real 404 body. Vercel serves dist/404.html with an HTTP 404 status for any
  // path that does not match a file, which is what replaces the old SPA rewrite
  // that answered 200 for literally every URL.
  await page.goto(`http://localhost:${PORT}/__not_found__`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('#root > *', { timeout: 10000 });
  await page.evaluate(() => {
    document.querySelectorAll('script[src*="/_vercel/insights"]').forEach((el) => el.remove());
  });
  const notFoundHtml = await page.content();
  writeFileSync(
    join(DIST, '404.html'),
    notFoundHtml.startsWith('<!DOCTYPE') || notFoundHtml.startsWith('<!doctype')
      ? notFoundHtml
      : '<!doctype html>\n' + notFoundHtml
  );
  // Markdown 404 that points agents at the machine-readable entry points, so a
  // probe that misses still learns how the site is laid out.
  writeFileSync(
    join(DIST, '404.md'),
    [
      '# 404 Not Found',
      '> That path does not exist on gavinpurcell.com.',
      'This URL is not a page on this site. Nothing was moved or removed here, the path simply never existed.',
      '## Where to go instead',
      '- Sitemap: https://gavinpurcell.com/sitemap.xml',
      '- Guide for AI systems and agents: https://gavinpurcell.com/llms.txt',
      '- Full text of the main pages: https://gavinpurcell.com/llms-full.txt',
      '- Homepage: https://gavinpurcell.com/',
      '- Writing: https://gavinpurcell.com/blog',
      '- About: https://gavinpurcell.com/about',
      '- Contact: https://gavinpurcell.com/contact',
      '',
    ].join('\n\n')
  );
  console.log('wrote 404.html + 404.md');
} finally {
  await browser.close();
  server.close();
}
