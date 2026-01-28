import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPosts } from '../services/wordpress';
import './FeaturedBlogPost.css';

function FeaturedBlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestPost();
  }, []);

  const loadLatestPost = async () => {
    try {
      const data = await fetchPosts(1, 1);
      if (data.posts.length > 0) {
        setPost(data.posts[0]);
      }
    } catch (err) {
      console.error('Failed to load latest post:', err);
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

  if (loading || !post) {
    return null;
  }

  return (
    <section className="featured-blog-post" id="latest-post">
      <div className="featured-blog-container">
        <motion.div
          className="featured-blog-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="featured-blog-title">Latest from the Blog</h2>
          <Link to="/blog" className="view-all-link">
            View All Posts →
          </Link>
        </motion.div>

        <motion.div
          className="featured-post-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {post.featuredImage && (
            <Link to={`/blog/${post.slug}`} className="featured-post-image-link">
              <div className="featured-post-image">
                <img src={post.featuredImage} alt={post.title} />
              </div>
            </Link>
          )}

          <div className="featured-post-content">
            <div className="featured-post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.categories.length > 0 && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="featured-post-category">
                    {post.categories[0].name}
                  </span>
                </>
              )}
            </div>

            <h3 className="featured-post-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="featured-post-excerpt">
              {stripHtml(post.excerpt)}
            </p>

            <Link to={`/blog/${post.slug}`} className="featured-post-cta">
              Read Full Post
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedBlogPost;
