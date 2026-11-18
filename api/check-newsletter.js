// Runs once a day from Vercel Cron (see vercel.json). If Beehiiv has a
// newsletter the live site does not, it asks Vercel for a fresh build; the
// build's sync step (scripts/sync-beehiiv.mjs) then pulls the issue in.
//
// Needs one environment variable in Vercel:
//   DEPLOY_HOOK_URL  a Deploy Hook for the production branch
//                    (Project Settings > Git > Deploy Hooks)
// Without it this endpoint only reports what it found.
// If CRON_SECRET is set, Vercel sends it as a bearer token and nothing else
// may call this.
/* global process */
const FEED = 'https://rss.beehiiv.com/feeds/TFrkJqDTNZ.xml';
const SITE = 'https://gavinpurcell.com';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    const [feed, sitemap] = await Promise.all([
      fetch(FEED, { headers: { 'user-agent': 'site-newsletter-check/1.0' } }).then((r) => (r.ok ? r.text() : Promise.reject(new Error(`feed ${r.status}`)))),
      fetch(`${SITE}/sitemap.xml`).then((r) => (r.ok ? r.text() : Promise.reject(new Error(`sitemap ${r.status}`)))),
    ]);

    const item = (feed.match(/<item>([\s\S]*?)<\/item>/) || [])[1] || '';
    const slug = (item.match(/<link>[^<]*\/p\/([^/?#<]+)/) || [])[1];
    const published = new Date((item.match(/<pubDate>([^<]+)/) || [])[1]);
    if (!slug || Number.isNaN(published.getTime())) throw new Error('could not read the newest feed item');
    const day = published.toISOString().slice(0, 10);

    // The site has it if the slug is in the sitemap, or (for the older posts
    // ported by hand under other slugs) if a post shares its publish day.
    const posts = [...sitemap.matchAll(/<loc>[^<]*\/blog\/([^<]+)<\/loc>\s*<lastmod>([^<]+)/g)];
    const onSite = posts.some(([, s, lastmod]) => s === slug || lastmod === day);
    if (onSite) return res.status(200).json({ newest: slug, published: day, onSite: true, rebuilt: false });

    const hook = process.env.DEPLOY_HOOK_URL;
    if (!hook) return res.status(200).json({ newest: slug, published: day, onSite: false, rebuilt: false, note: 'DEPLOY_HOOK_URL is not set' });

    const hit = await fetch(hook, { method: 'POST' });
    return res.status(200).json({ newest: slug, published: day, onSite: false, rebuilt: hit.ok, hookStatus: hit.status });
  } catch (err) {
    return res.status(502).json({ error: String(err?.message ?? err) });
  }
}
