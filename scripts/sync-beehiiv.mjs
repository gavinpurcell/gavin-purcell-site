// Pulls new AI For Humans newsletters from the Beehiiv RSS feed into the site's
// writing section. Runs at the start of every build, so a deploy always carries
// the latest issue. Run it by hand (`npm run sync`) and commit the result to
// keep a post in the repo for good.
//
// For each feed item that is not already a post it writes:
//   src/content/posts/<slug>.html   the cleaned body
//   public/post-art/<slug>.webp     the header art, self-hosted (the dither
//                                   plates read pixels, so it must be same-origin)
// and prepends an entry to src/content/posts.json.
//
// A post is "already there" if any existing post shares its publish day. The
// older posts were ported by hand under different slugs, so slug alone would
// re-import them.
//
// It must never break a build: any failure logs and leaves the posts as they are.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const FEED = 'https://rss.beehiiv.com/feeds/TFrkJqDTNZ.xml';
const ROOT = new URL('..', import.meta.url);
const POSTS_JSON = new URL('src/content/posts.json', ROOT);
const BODIES = new URL('src/content/posts/', ROOT);
const ART = new URL('public/post-art/', ROOT);

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s) => escapeText(s).replace(/"/g, '&quot;');

function field(item, tag) {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim() : '';
}

// Newsletter links carry utm tracking for the email; the site does not need it.
function cleanUrl(raw) {
  try {
    const url = new URL(decode(raw));
    [...url.searchParams.keys()].filter((k) => /^utm_|^_bhlid$|^ref$/.test(k)).forEach((k) => url.searchParams.delete(k));
    return url.href;
  } catch {
    return decode(raw);
  }
}

const KEEP = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'b', 'strong', 'i', 'em', 'br', 'img', 'blockquote', 'sub', 'sup']);

// Beehiiv's email HTML -> the plain HTML the post page styles.
export function cleanBody(html) {
  let s = html.replace(/<style[\s\S]*?<\/style>/g, '');

  // Email furniture: the "Today on AI For Humans" box up top, the footer, and
  // the closing call-to-action box.
  s = s.replace(/<div class=['"]beehiiv__footer['"][\s\S]*$/, '');
  s = s.replace(/<div class="section"[^>]*>\s*<p[^>]*>\s*(?:<span[^>]*>)?\s*<b>Today on AI For Humans:[\s\S]*?<\/div>/, '');
  s = s.replace(/<div class="section"[^>]*>(?:(?!<div class="section")[\s\S])*?Are you a creative or brand[\s\S]*?<\/div>/, '');

  // The sponsor read sits between two content breaks.
  s = s.replace(/<hr class="content_break"[^>]*>(?:(?!<hr class="content_break")[\s\S])*?Visiting Our Sponsors[\s\S]*?<hr class="content_break"[^>]*>/, '');

  // An embedded post arrives as a bare link plus a "Twitter tweet" placeholder.
  s = s.replace(
    /<blockquote[^>]*class="twitter-tweet"[^>]*>\s*<a href="([^"]+)"[^>]*>[\s\S]*?<\/blockquote>(?:\s*<p[^>]*>\s*Twitter tweet\s*<\/p>)?/g,
    (_, href) => {
      const url = cleanUrl(href).replace('://twitter.com/', '://x.com/');
      const who = (url.match(/x\.com\/([^/]+)\/status/) || [])[1];
      return `<p class="post-embed"><a href="${escapeAttr(url)}">${who ? `See the post from @${escapeText(who)} on X` : 'See the post on X'}</a></p>`;
    }
  );

  // Videos: privacy-enhanced player, lazy, in a 16:9 box.
  s = s.replace(/<iframe[^>]*src="([^"]+)"[^>]*>\s*<\/iframe>/g, (_, src) => {
    const id = (decode(src).match(/(?:embed\/|v=)([\w-]{11})/) || [])[1];
    if (!id) return '';
    return `@@VIDEO:${id}@@`; // expanded after the tag filter, which drops every div
  });

  // Headings: the page already has the h1, so everything steps down into h2/h3.
  s = s.replace(/<(\/?)h1\b/g, '<$1h2').replace(/<(\/?)h4\b/g, '<$1h3').replace(/<(\/?)h[56]\b/g, '<$1h3');

  // Now strip to the allowed tags and attributes.
  s = s.replace(/<(\/?)([a-zA-Z0-9]+)([^>]*)>/g, (_, close, rawTag, attrs) => {
    const tag = rawTag.toLowerCase();
    if (!KEEP.has(tag)) return '';
    if (close) return `</${tag}>`;
    if (tag === 'a') {
      const href = (attrs.match(/href="([^"]*)"/) || [])[1];
      if (!href) return '<a>';
      const url = cleanUrl(href);
      const external = !/^https:\/\/gavinpurcell\.com/.test(url);
      return `<a href="${escapeAttr(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>`;
    }
    if (tag === 'img') {
      const src = (attrs.match(/src="([^"]*)"/) || [])[1];
      if (!src) return '';
      const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || '';
      return `<img src="${escapeAttr(decode(src))}" alt="${alt}" loading="lazy" />`;
    }
    if (tag === 'p' && /class="post-embed"/.test(attrs)) return '<p class="post-embed">';
    return `<${tag}>`;
  });

  s = s.replace(
    /@@VIDEO:([\w-]{11})@@/g,
    (_, id) =>
      `<div class="post-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
  );

  // Drop empties, tidy whitespace.
  s = s.replace(/<a>([\s\S]*?)<\/a>/g, '$1');
  s = s.replace(/<p>\s*(?:<br>\s*)*<\/p>/g, '').replace(/<(h2|h3)>\s*<\/\1>/g, '');
  s = s.replace(/>\s*</g, '>\n<').replace(/\n{2,}/g, '\n').trim();
  return s + '\n';
}

async function saveArt(url, slug) {
  const { default: sharp } = await import('sharp');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`header art ${res.status}`);
  mkdirSync(ART, { recursive: true });
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(new URL(`${slug}.webp`, ART).pathname);
  return `/post-art/${slug}.webp`;
}

async function main() {
  const res = await fetch(FEED, { headers: { 'user-agent': 'site-build-sync/1.0' } });
  if (!res.ok) throw new Error(`feed responded ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  if (!items.length) throw new Error('feed has no items');

  const posts = JSON.parse(readFileSync(POSTS_JSON, 'utf8'));
  const day = (iso) => iso.slice(0, 10);
  const haveDays = new Set(posts.map((p) => day(p.date)));
  const haveSlugs = new Set(posts.map((p) => p.slug));
  let nextId = Math.max(...posts.map((p) => p.id)) + 1;
  const added = [];

  // Oldest first, so ids climb with time.
  for (const item of items.reverse()) {
    const date = new Date(field(item, 'pubDate'));
    const slug = (field(item, 'link').match(/\/p\/([^/?#]+)/) || [])[1];
    if (!slug || Number.isNaN(date.getTime())) continue;
    const iso = date.toISOString();
    if (haveSlugs.has(slug) || haveDays.has(day(iso))) continue;

    const body = cleanBody(field(item, 'content:encoded'));
    if (body.length < 800) {
      console.warn(`[beehiiv] skipped ${slug}: body came out suspiciously short (${body.length} chars)`);
      continue;
    }

    let featuredImage = null;
    const art = (item.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1];
    if (art) {
      try {
        featuredImage = await saveArt(decode(art), slug);
      } catch (err) {
        console.warn(`[beehiiv] ${slug}: no header art (${err.message})`);
      }
    }

    writeFileSync(new URL(`${slug}.html`, BODIES), body);
    added.push({
      id: nextId++,
      title: decode(field(item, 'title')),
      excerpt: `<p>${escapeText(decode(field(item, 'description')))}</p>`,
      slug,
      date: iso,
      modified: iso,
      author: { name: 'Gavin Purcell', avatar: null },
      featuredImage,
      categories: [{ id: 1, name: 'AI & Media', slug: 'ai-media' }],
      tags: [],
    });
    haveDays.add(day(iso));
  }

  if (!added.length) {
    console.log(`[beehiiv] up to date (${posts.length} posts, newest ${day(posts[0].date)})`);
    return;
  }
  const all = [...added.reverse(), ...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  writeFileSync(POSTS_JSON, JSON.stringify(all, null, 2) + '\n');
  console.log(`[beehiiv] added ${added.length}: ${added.map((p) => p.slug).join(', ')}`);
}

// Only sync when run as a script; the tests import cleanBody() from this file.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href && existsSync(POSTS_JSON)) {
  try {
    await main();
  } catch (err) {
    console.warn(`[beehiiv] sync skipped: ${err.message}`);
  }
}
