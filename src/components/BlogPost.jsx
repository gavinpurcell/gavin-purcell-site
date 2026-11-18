import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { formatDate, getPost, loadPostBody, plainExcerpt, posts } from '../content/posts';
import DitherPlate from './signal/DitherPlate';
import './signal/signal.css';
import './Page.css';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  // The body is its own chunk; remember which slug it belongs to so a stale
  // body never shows under the next post's title.
  const [loaded, setLoaded] = useState({ slug: null, html: '', failed: false });

  useEffect(() => {
    if (!post) return undefined;
    let cancelled = false;
    loadPostBody(slug)
      .then((html) => !cancelled && setLoaded({ slug, html, failed: false }))
      .catch(() => !cancelled && setLoaded({ slug, html: '', failed: true }));
    return () => {
      cancelled = true;
    };
  }, [slug, post]);

  const body = loaded.slug === slug ? loaded : { html: '', failed: false };
  const error = body.failed ? 'This post failed to load. Try refreshing.' : null;
  const description = post ? plainExcerpt(post).substring(0, 155) : '';
  const [active, setActive] = useState(false);
  // The neighbours in time: the next newer post and the two before it.
  const at = posts.findIndex((p) => p.slug === slug);
  const more = at < 0 ? [] : [posts[at - 1], posts[at + 1], posts[at + 2]].filter(Boolean);

  if (error || !post) {
    return (
      <main id="main" className="page">
        <Helmet>
          <title>Post Not Found - Gavin Purcell</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="page-title">Not here</h1>
        <p className="page-lede">{error || 'There is no post at this address.'}</p>
        <Link to="/blog" className="page-cta">All writing</Link>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Gavin Purcell</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://gavinpurcell.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gavinpurcell.com/blog/${post.slug}`} />
        {post.featuredImage && (
          <meta
            property="og:image"
            content={post.featuredImage.startsWith('/')
              ? `https://gavinpurcell.com${post.featuredImage}`
              : post.featuredImage}
          />
        )}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
        <meta property="article:author" content={post.author.name} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": description,
            "image": post.featuredImage
              ? (post.featuredImage.startsWith('/') ? `https://gavinpurcell.com${post.featuredImage}` : post.featuredImage)
              : "https://gavinpurcell.com/gavinpurcellheadshot.jpeg",
            "datePublished": post.date,
            "dateModified": post.modified,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "url": "https://gavinpurcell.com"
            },
            "publisher": {
              "@type": "Person",
              "name": "Gavin Purcell",
              "url": "https://gavinpurcell.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://gavinpurcell.com/gavin-photo-og.jpg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://gavinpurcell.com/blog/${post.slug}`
            },
            "keywords": post.tags.map(tag => tag.name).join(', ')
          })}
        </script>
      </Helmet>

      <article id="main" className="page post">
        <header className="post-head">
          <p className="post-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </p>
          <h1 className="post-title">{post.title}</h1>
        </header>

        {post.featuredImage && (
          <div
            className="post-plate"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
            onPointerLeave={() => setActive(false)}
          >
            <DitherPlate image={post.featuredImage} alt={post.title} aspect="3 / 2" gamma={1} active={active} />
          </div>
        )}

        <div className="post-layout">
          <aside className="post-aside">
            <p>
              By <Link to="/about">{post.author.name}</Link>, from the{' '}
              <a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener noreferrer">
                AI For Humans newsletter
              </a>
              .
            </p>
            <Link to="/blog">All writing</Link>
          </aside>
          <div
            className="blog-post-content"
            aria-busy={!body.html}
            dangerouslySetInnerHTML={{ __html: body.html }}
          />
        </div>

        {more.length > 0 && (
          <nav className="post-more" aria-label="More writing">
            <h2>Keep reading</h2>
            <ul>
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`}>
                    <time dateTime={p.date}>{formatDate(p.date, 'short')}</time>
                    <span>{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </>
  );
}

export default BlogPost;
