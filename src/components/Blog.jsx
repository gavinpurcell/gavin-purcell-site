import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { fetchPosts } from '../services/wordpress';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts(currentPage);
  }, [currentPage]);

  const loadPosts = async (page) => {
    try {
      setLoading(true);
      const data = await fetchPosts(page, 10);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="blog-error">
          <h2>Oops!</h2>
          <p>{error}</p>
          <button onClick={() => loadPosts(currentPage)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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

      <div className="blog-container">
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Thoughts on AI, media, and the future of creative technology
          </p>
        </motion.div>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {post.featuredImage && (
                <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                  <div className="blog-card-image">
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                </Link>
              )}

              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.categories.length > 0 && (
                    <span className="blog-card-category">
                      {post.categories[0].name}
                    </span>
                  )}
                </div>

                <h2 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <div className="blog-card-excerpt">
                  {stripHtml(post.excerpt)}
                </div>

                <div className="blog-card-footer">
                  <div className="blog-card-author">
                    {post.author.avatar && (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="author-avatar"
                      />
                    )}
                    <span>{post.author.name}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="read-more-link">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="blog-pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              ← Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Blog;
