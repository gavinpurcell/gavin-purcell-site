// HTTP Accept negotiation per RFC 9110 section 12.5.1, used to decide whether a
// request wants the markdown twin of a page or the HTML one.
//
// Shared by middleware.js. Pure logic, no runtime dependencies, so it unit tests
// under plain node while also running in the edge runtime.

const CANDIDATES = ['text/markdown', 'text/html'];

// Returns { q, specificity } for one candidate type against a parsed Accept.
// specificity: 2 = exact ("text/markdown"), 1 = subtype wildcard ("text/*"),
// 0 = full wildcard ("*/*"). A more specific range wins ties, which is what
// stops `Accept: */*` from being read as a deliberate request for markdown.
function match(ranges, type) {
  const [primary, sub] = type.split('/');
  let best = { q: 0, specificity: -1, index: Infinity };
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    let specificity;
    if (range.type === primary && range.sub === sub) specificity = 2;
    else if (range.type === primary && range.sub === '*') specificity = 1;
    else if (range.type === '*' && range.sub === '*') specificity = 0;
    else continue;
    if (specificity > best.specificity) best = { q: range.q, specificity, index: i };
  }
  return best;
}

export function parseAccept(header) {
  return String(header || '')
    .split(',')
    .map((part) => {
      const [media, ...params] = part.trim().split(';');
      const [type, sub] = media.trim().toLowerCase().split('/');
      const qParam = params.map((p) => p.trim()).find((p) => /^q=/i.test(p));
      let q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
      if (!Number.isFinite(q) || q < 0) q = 0;
      if (q > 1) q = 1;
      return { type: type || '*', sub: sub || '*', q };
    })
    .filter((r) => r.type);
}

/**
 * Decide what to serve.
 * @returns {'text/markdown'|'text/html'|null} null means nothing acceptable (406).
 */
export function preferredType(header) {
  // No Accept header at all means the client has no preference: RFC 9110 says
  // treat that as accepting anything, and HTML stays the safe default.
  if (!header || !String(header).trim()) return 'text/html';

  const ranges = parseAccept(header);
  const scored = CANDIDATES.map((type) => ({ type, ...match(ranges, type) }));
  const viable = scored.filter((s) => s.q > 0);
  if (viable.length === 0) return null;

  viable.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    if (b.specificity !== a.specificity) return b.specificity - a.specificity;
    // Same q and same specificity: whichever the client named first wins. When
    // both were matched by the *same* range (`Accept: */*`, the curl default),
    // there is no stated preference at all, so HTML stays the default.
    if (a.index !== b.index) return a.index - b.index;
    return a.type === 'text/html' ? -1 : 1;
  });
  return viable[0].type;
}

export const SUPPORTED = CANDIDATES;
