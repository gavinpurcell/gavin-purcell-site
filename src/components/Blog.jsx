import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { formatDate, plainExcerpt, posts } from '../content/posts';
import DitherPlate from './signal/DitherPlate';
import './signal/signal.css';
import './Page.css';
import './Blog.css';

function LeadPost({ post }) {
  const [active, setActive] = useState(false);
  return (
    <article
      className="blog-lead"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      {post.featuredImage && (
        <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <DitherPlate image={post.featuredImage} aspect="3 / 2" gamma={1} active={active} />
        </Link>
      )}
      <div>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <h2 className="blog-lead-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{plainExcerpt(post)}</p>
      </div>
    </article>
  );
}

function Blog() {
  const [latest, ...rest] = posts;
  return (
    <main id="main" className="page">
      <Helmet>
        <title>Blog - Gavin Purcell | AI & Media Insights</title>
        <meta
          name="description"
          content="Read the latest insights on AI, media, and technology from Gavin Purcell, host of AI For Humans podcast."
        />
        <link rel="canonical" href="https://gavinpurcell.com/blog" />
        <meta property="og:title" content="Blog - Gavin Purcell" />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="page-title">Writing</h1>
      <p className="page-lede">
        Field notes on new AI models and tools, from the weekly AI For Humans newsletter.
      </p>

      <LeadPost post={latest} />

      <ul className="blog-list">
        {rest.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>
              <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
              <span className="blog-row-title">{post.title}</span>
              <span className="blog-row-excerpt">{plainExcerpt(post)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Blog;
