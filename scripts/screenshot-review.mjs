// Review helper: serves dist/, walks every route checking for console errors,
// and saves desktop + mobile screenshots of the home page for design review.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = new URL('../dist', import.meta.url).pathname;
const OUT = process.argv[2] || '/tmp';
const PORT = 4519;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = join(DIST, url);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (url === '/' || !existsSync(file)) file = join(DIST, 'index.html');
  res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(PORT, r));

const routes = ['/', '/blog', '/blog/claude-mythos-is-nearly-here', '/definitely-not-a-page'];
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`${page.url()}: ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`${page.url()}: ${err.message}`));

for (const route of routes) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
  console.log(`walked ${route}: title="${await page.title()}"`);
}

mkdirSync(OUT, { recursive: true });
// Home, desktop: hero and consulting
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(OUT, 'hero-1440.png') });
await page.evaluate(() => document.querySelector('#consulting')?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1200)); // let whileInView animations land
await page.screenshot({ path: join(OUT, 'consulting-1440.png') });
await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: join(OUT, 'intake-1440.png') });

// Home, mobile
await page.setViewport({ width: 375, height: 812 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(OUT, 'hero-375.png') });
await page.evaluate(() => window.scrollBy(0, 900));
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: join(OUT, 'rundown-375.png') });

console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'no console errors');
await browser.close();
server.close();
