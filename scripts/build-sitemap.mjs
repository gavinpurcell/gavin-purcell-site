// Writes dist/sitemap.xml after `vite build` and before the prerender, which
// takes its list of routes from this file. Blog posts come straight from
// src/content/posts.json, so adding a post there is all it takes: there is no
// second list to keep in step (a route missing from the sitemap is never
// prerendered, and with no SPA fallback it would 404 in production).
//
// `lastmod` is only useful to a crawler if it is true. Posts use their own
// modified date. The pages below carry the date their content last changed:
// bump it by hand when you edit one.
import { readFileSync, writeFileSync } from 'node:fs';

const ORIGIN = 'https://gavinpurcell.com';
const posts = JSON.parse(readFileSync(new URL('../src/content/posts.json', import.meta.url), 'utf8'));
const day = (iso) => iso.slice(0, 10);
const newestPost = posts.map((p) => day(p.modified || p.date)).sort().at(-1);
const later = (a, b) => (a > b ? a : b);

const pages = [
  { path: '/', lastmod: '2026-11-18' },
  { path: '/blog', lastmod: later('2026-11-18', newestPost) },
  { path: '/about', lastmod: '2026-11-18' },
  { path: '/work', lastmod: '2026-11-18' },
  { path: '/the-last-invention', lastmod: '2026-11-18' },
  { path: '/contact', lastmod: '2026-08-21' },
  { path: '/privacy', lastmod: '2026-08-21' },
  // Hand-authored static pages under public/ (the prerender skips these).
  { path: '/vhs-prompt-recipe', lastmod: '2026-08-25' },
];

const urls = [
  ...pages,
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: day(p.modified || p.date) })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url>\n    <loc>${ORIGIN}${u.path}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`),
  '</urlset>',
  '',
].join('\n');

writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), xml);
console.log(`[sitemap] ${urls.length} urls (${posts.length} posts)`);
