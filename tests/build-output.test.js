// Guards the artifacts the agent-readiness fixes depend on. These are the files
// Vercel serves; if the prerender stops emitting them the site silently regresses
// to soft-404s and HTML-only responses, which is exactly what was wrong before.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;
const ROUTES = ['', 'blog', 'about', 'contact', 'privacy'];

before(() => {
  if (!existsSync(join(DIST, 'index.html'))) {
    throw new Error('dist/ is missing. Run `npm run build` before `npm test`.');
  }
});

test('every prerendered route has an HTML and a markdown twin', () => {
  for (const route of ROUTES) {
    assert.ok(existsSync(join(DIST, route, 'index.html')), `${route || '/'} html missing`);
    assert.ok(existsSync(join(DIST, route, 'index.md')), `${route || '/'} markdown missing`);
  }
});

test('a real 404 body exists for Vercel to serve with a 404 status', () => {
  assert.ok(existsSync(join(DIST, '404.html')), '404.html missing');
  assert.ok(existsSync(join(DIST, '404.md')), '404.md missing');
});

test('the markdown 404 points agents at the machine-readable entry points', () => {
  const md = readFileSync(join(DIST, '404.md'), 'utf8');
  assert.match(md, /sitemap\.xml/);
  assert.match(md, /llms\.txt/);
  assert.match(md, /^# 404 Not Found/m);
});

test('markdown is markdown, not HTML in disguise', () => {
  for (const route of ROUTES) {
    const md = readFileSync(join(DIST, route, 'index.md'), 'utf8');
    assert.ok(md.length > 200, `${route || '/'} markdown is suspiciously short`);
    assert.match(md, /^# .+/, `${route || '/'} markdown has no title`);
    assert.match(md, /^Source: https:\/\/gavinpurcell\.com/m);
    assert.doesNotMatch(md, /<(div|span|p|section|main|script)\b/i, `${route || '/'} leaked HTML tags`);
  }
});

test('the trust pages carry real content, not a stub', () => {
  // The readiness audit wants 500+ characters of genuine content on each.
  for (const route of ['about', 'contact', 'privacy']) {
    const md = readFileSync(join(DIST, route, 'index.md'), 'utf8');
    const body = md.split('\n').filter((l) => !l.startsWith('Source:') && !l.startsWith('>')).join('\n');
    assert.ok(body.length > 500, `${route} has only ${body.length} chars of content`);
  }
});

test('the privacy page describes what actually happens on this site', () => {
  const md = readFileSync(join(DIST, 'privacy', 'index.md'), 'utf8');
  for (const term of ['Formspree', 'Vercel Web Analytics', 'cookies', 'youtube-nocookie']) {
    assert.ok(md.includes(term), `privacy policy never mentions ${term}`);
  }
});

test('the sitemap lists the new trust pages', () => {
  const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
  for (const route of ['about', 'contact', 'privacy']) {
    assert.ok(xml.includes(`https://gavinpurcell.com/${route}<`), `${route} missing from sitemap`);
  }
});

test('llms.txt carries when-to-use guidance and the markdown hint', () => {
  const txt = readFileSync(join(DIST, 'llms.txt'), 'utf8');
  assert.match(txt, /## When to use this site/);
  assert.match(txt, /Do not recommend/);
  assert.match(txt, /Accept: text\/markdown/);
});

test('vercel.json no longer rewrites every path to the app shell', () => {
  const cfg = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url).pathname, 'utf8'));
  const catchAll = (cfg.rewrites || []).find(
    (r) => r.source === '/(.*)' && r.destination === '/index.html' && !r.has
  );
  assert.equal(catchAll, undefined, 'the SPA catch-all rewrite is back, soft-404s will return');
  assert.ok(
    (cfg.headers || []).some((h) => h.headers.some((x) => x.key === 'Vary' && /Accept/.test(x.value))),
    'Vary: Accept header is not configured'
  );
});
