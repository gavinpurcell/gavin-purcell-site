// Content negotiation unit tests. https://acceptmarkdown.com requires markdown on
// `Accept: text/markdown`, `Vary: Accept`, 406 on unsupported types, and q-values
// honored. This covers the decision logic behind all four.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preferredType, parseAccept } from '../api/_accept.js';

test('serves markdown when markdown is asked for', () => {
  assert.equal(preferredType('text/markdown'), 'text/markdown');
  assert.equal(preferredType('text/markdown, text/html'), 'text/markdown');
  assert.equal(preferredType('text/markdown;q=1.0,text/html;q=1.0'), 'text/markdown');
});

test('serves html to browsers', () => {
  assert.equal(preferredType('text/html'), 'text/html');
  assert.equal(
    preferredType('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    'text/html'
  );
});

test('a bare wildcard is not a request for markdown', () => {
  // curl's default Accept. No stated preference means HTML, the default
  // representation, must win. Getting this wrong serves markdown to everyone.
  assert.equal(preferredType('*/*'), 'text/html');
  assert.equal(preferredType('text/*'), 'text/html');
});

test('honors q-values', () => {
  assert.equal(preferredType('text/markdown;q=0.1, text/html;q=0.9'), 'text/html');
  assert.equal(preferredType('text/markdown;q=0.9, text/html;q=0.1'), 'text/markdown');
  assert.equal(preferredType('text/html;q=0.2,text/markdown;q=0.8'), 'text/markdown');
});

test('q=0 means not acceptable, never a positive preference', () => {
  assert.equal(preferredType('text/markdown;q=0'), null);
  assert.equal(preferredType('text/html;q=0, text/markdown;q=0'), null);
  assert.equal(preferredType('text/markdown;q=0, text/html'), 'text/html');
});

test('returns null (406) when nothing acceptable can be produced', () => {
  assert.equal(preferredType('application/pdf'), null);
  assert.equal(preferredType('image/png, image/jpeg'), null);
});

test('a missing Accept header falls back to html', () => {
  assert.equal(preferredType(''), 'text/html');
  assert.equal(preferredType(undefined), 'text/html');
  assert.equal(preferredType(null), 'text/html');
});

test('malformed q-values do not crash or grant preference', () => {
  assert.equal(preferredType('text/markdown;q=banana'), null);
  assert.equal(preferredType('text/markdown;q=99'), 'text/markdown');
  assert.equal(preferredType('text/markdown;q=-3'), null);
});

test('parseAccept defaults q to 1 and lowercases types', () => {
  assert.deepEqual(parseAccept('TEXT/Markdown'), [{ type: 'text', sub: 'markdown', q: 1 }]);
});
