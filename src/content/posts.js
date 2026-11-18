// The writing lives in two places so the homepage does not have to carry it:
//   posts.json        one small metadata entry per post, newest first
//   posts/<slug>.html the body, loaded only when that post is opened
// To add a post: drop its HTML in posts/ and prepend its entry to posts.json.
// The sitemap, and so the prerender, pick it up from there at build time.
import meta from './posts.json';

const bodies = import.meta.glob('./posts/*.html', { query: '?raw', import: 'default' });

export const posts = meta;

export function getPost(slug) {
  return meta.find((p) => p.slug === slug) || null;
}

export function loadPostBody(slug) {
  const load = bodies[`./posts/${slug}.html`];
  return load ? load() : Promise.reject(new Error(`No body for post "${slug}"`));
}

// Excerpts are stored as HTML; lists and meta tags want plain text.
export function plainExcerpt(post) {
  return post.excerpt.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, '’').trim();
}

export function formatDate(iso, month = 'long') {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' });
}
