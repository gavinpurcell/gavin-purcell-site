// Postbuild prerender: serves dist/ with an SPA fallback (mirroring the
// vercel.json rewrite), visits every sitemap route in headless Chrome, and
// writes the hydrated HTML back into dist/ so crawlers and AI search engines
// get real content instead of an empty <div id="root">.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

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

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  // Never let the prerender hit live APIs; the SPA falls back gracefully
  await page.setRequestInterception(true);
  page.on('request', (req) =>
    req.url().includes('/api/') ? req.abort() : req.continue()
  );

  for (const route of routes) {
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
    const html = await page.content();
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(
      join(outDir, 'index.html'),
      html.startsWith('<!DOCTYPE') || html.startsWith('<!doctype') ? html : '<!doctype html>\n' + html
    );
    console.log(`prerendered ${route} (${(html.length / 1024).toFixed(0)}KB)`);
  }
} finally {
  await browser.close();
  server.close();
}
