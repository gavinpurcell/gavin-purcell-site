import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <main className="not-found" style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '50vh' }}>
      <Helmet>
        <title>Page Not Found | Gavin Purcell</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <p>
        <Link to="/">Back to the homepage</Link> or <Link to="/blog">check out the blog</Link>.
      </p>
    </main>
  );
}
