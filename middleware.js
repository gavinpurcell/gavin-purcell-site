// Edge Middleware: markdown content negotiation for agents.
// https://acceptmarkdown.com
//
// This has to be middleware rather than a vercel.json rewrite. Vercel matches
// static files BEFORE it evaluates rewrites, so once the prerender writes
// about/index.html no rewrite can ever intercept a request for /about. Edge
// middleware runs ahead of the filesystem, which is the only place this decision
// can be made.
//
// Fail-safe by construction: every unexpected path calls next() and the request
// is served exactly as it was before this file existed.
import { next } from '@vercel/edge';
import { preferredType, SUPPORTED } from './lib/accept.js';

export const config = {
  // Skip Vercel internals, the API surface, and anything with a file extension
  // (assets, sitemap.xml, llms.txt), which must keep their own content types.
  matcher: ['/((?!_vercel|api/|.*\\.).*)'],
};

const NOT_ACCEPTABLE = [
  '# 406 Not Acceptable',
  'This URL can be served as `text/html` or as `text/markdown`. Your request asked for neither.',
  'Send `Accept: text/markdown` for the markdown representation, or `Accept: text/html` for the rendered page.',
  '',
].join('\n\n');

export default async function middleware(request) {
  try {
    const wanted = preferredType(request.headers.get('accept'));

    if (wanted === null) {
      return new Response(NOT_ACCEPTABLE, {
        status: 406,
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          vary: 'Accept, Accept-Encoding',
          'x-supported-types': SUPPORTED.join(', '),
        },
      });
    }

    if (wanted !== 'text/markdown') return next();

    const url = new URL(request.url);
    const base = url.pathname.replace(/\/+$/, '');
    const target = new URL(`${base}/index.md`, url.origin);

    // Explicit Accept on the inner fetch so this never re-enters itself.
    const upstream = await fetch(target, { headers: { accept: 'text/html' } });

    if (upstream.ok) {
      return new Response(await upstream.text(), {
        status: 200,
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          vary: 'Accept, Accept-Encoding',
          'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Unknown path, asked for in markdown: answer 404 in markdown.
    const fallback = await fetch(new URL('/404.md', url.origin), { headers: { accept: 'text/html' } });
    return new Response(fallback.ok ? await fallback.text() : '# 404 Not Found\n', {
      status: 404,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        vary: 'Accept, Accept-Encoding',
      },
    });
  } catch {
    // Never let negotiation take the site down.
    return next();
  }
}
