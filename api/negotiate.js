// Content negotiation for agents, per https://acceptmarkdown.com
//
// vercel.json routes a request here only when its Accept header mentions
// markdown, or when it names a type this site cannot produce at all. Everything
// else is served straight off the CDN as static HTML and never touches this
// function, so ordinary visitors pay nothing for it.
//
// Responsibilities:
//   - full q-value negotiation (RFC 9110 12.5.1) via ./_accept.js
//   - Content-Type: text/markdown; charset=utf-8 on markdown responses
//   - Vary: Accept on every response so a CDN never crosses the two variants
//   - 406 when nothing acceptable can be produced
import { preferredType, SUPPORTED } from './_accept.js';

const NOT_ACCEPTABLE_BODY = [
  '# 406 Not Acceptable',
  'This URL can be served as `text/html` or as `text/markdown`.',
  'Your request asked for neither.',
  'Send `Accept: text/markdown` for the markdown representation, or',
  '`Accept: text/html` for the rendered page.',
  '',
].join('\n\n');

function normalize(pathParam) {
  const raw = Array.isArray(pathParam) ? pathParam.join('/') : pathParam || '';
  const clean = String(raw).split('?')[0].replace(/^\/+/, '').replace(/\/+$/, '');
  return clean;
}

export default async function handler(req, res) {
  const accept = req.headers.accept;
  const wanted = preferredType(accept);

  res.setHeader('Vary', 'Accept, Accept-Encoding');

  if (wanted === null) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('X-Supported-Types', SUPPORTED.join(', '));
    res.status(406).send(NOT_ACCEPTABLE_BODY);
    return;
  }

  const path = normalize(req.query.path);
  // Never let this function proxy the API surface back into itself.
  if (path.startsWith('api/')) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.status(404).send('# 404 Not Found\n');
    return;
  }

  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const origin = `${proto}://${host}`;
  const isMarkdown = wanted === 'text/markdown';
  const target = isMarkdown
    ? `${origin}/${path ? path + '/' : ''}index.md`
    : `${origin}/${path}`;

  try {
    // Accept: text/html on the inner fetch keeps it off this same rewrite rule.
    const upstream = await fetch(target, { headers: { accept: 'text/html' } });

    if (upstream.ok) {
      const body = await upstream.text();
      res.setHeader(
        'Content-Type',
        isMarkdown ? 'text/markdown; charset=utf-8' : 'text/html; charset=utf-8'
      );
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
      res.status(200).send(body);
      return;
    }

    // Unknown path. Answer 404 in the representation that was asked for.
    if (isMarkdown) {
      const fallback = await fetch(`${origin}/404.md`, { headers: { accept: 'text/html' } });
      const body = fallback.ok ? await fallback.text() : '# 404 Not Found\n';
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.status(404).send(body);
      return;
    }
    const fallback = await fetch(`${origin}/404.html`, { headers: { accept: 'text/html' } });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(fallback.ok ? await fallback.text() : '<!doctype html><title>404</title><h1>404</h1>');
  } catch {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(502).send('upstream unavailable');
  }
}
