// Tells Bing (and the other IndexNow engines) which URLs changed, so they
// recrawl in minutes rather than days. Bing's index feeds Copilot.
// Run it AFTER a production deploy is live:  npm run indexnow
// The key file public/74528f3c10749c5404df95c8126db7c9.txt proves we own the domain.
import { readFileSync } from 'node:fs';

const HOST = 'gavinpurcell.com';
const KEY = '74528f3c10749c5404df95c8126db7c9';
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`[indexnow] ${urlList.length} urls -> HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exitCode = 1;
