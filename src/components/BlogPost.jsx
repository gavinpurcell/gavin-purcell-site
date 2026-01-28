import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { fetchPostBySlug } from '../services/wordpress';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await fetchPostBySlug(slug);
      setPost(data);
      setError(null);

      // Scroll to top when post loads
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Post not found or failed to load.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h2>404</h2>
          <p>{error || 'Post not found'}</p>
          <Link to="/blog" className="back-button">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Gavin Purcell</title>
        <meta name="description" content={stripHtml(post.excerpt).substring(0, 155)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={stripHtml(post.excerpt).substring(0, 155)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gavinpurcell.com/blog/${post.slug}`} />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
        <meta property="article:author" content={post.author.name} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": stripHtml(post.excerpt).substring(0, 155),
            "image": post.featuredImage || "https://gavinpurcell.com/gavin-photo.png",
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
                "url": "https://gavinpurcell.com/gavin-photo.png"
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

      <article className="blog-post-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" className="back-link">
            ← Back to Blog
          </Link>

          <header className="blog-post-header">
            {post.categories.length > 0 && (
              <div className="blog-post-categories">
                {post.categories.map(cat => (
                  <span key={cat.id} className="category-tag">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="blog-post-title">{post.title}</h1>

            <div className="blog-post-meta">
              <div className="post-author">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="author-avatar-large"
                  />
                )}
                <div>
                  <div className="author-name">{post.author.name}</div>
                  <time dateTime={post.date} className="post-date">
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="blog-post-tags">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="tag">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {post.featuredImage && (
            <div className="blog-post-featured-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="blog-post-footer">
            <div className="post-footer-divider"></div>

            <div className="post-footer-content">
              <div className="post-author-bio">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="author-avatar-large"
                  />
                )}
                <div>
                  <h3>Written by {post.author.name}</h3>
                  <p>AI media expert, host of AI For Humans podcast</p>
                </div>
              </div>

              <Link to="/blog" className="back-to-blog-button">
                ← Back to All Posts
              </Link>
            </div>
          </footer>
        </motion.div>
      </article>
    </>
  );
}

export default BlogPost;
