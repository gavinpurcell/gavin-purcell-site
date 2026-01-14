import { useState } from 'react';
import { motion } from 'framer-motion';
import './AIForHumans.css';

export default function AIForHumans() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Use Beehiiv magic link
      const subscribeUrl = `https://magic.beehiiv.com/v1/49f89fc8-db2d-413c-9350-0f92f8b7db32?email=${encodeURIComponent(email)}`;
      window.open(subscribeUrl, '_blank');
      setEmail(''); // Clear the form
    }
  };

  return (
    <section id="aifh" className="aifh section">
      <div className="container">
        <motion.div
          className="aifh-hero"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aifh-logo-container">
            <a href="https://aiforhumans.show" target="_blank" rel="noopener noreferrer">
              <img
                src="/aifh-logo.png"
                alt="AI For Humans Podcast"
                className="aifh-logo"
              />
            </a>
            <a href="https://aiforhumans.show" target="_blank" rel="noopener noreferrer" className="aifh-website-link">
              Visit Show Website →
            </a>
          </div>

          <div className="aifh-intro">
            <p className="aifh-description">
              Co-hosted with <strong>Kevin Pereira</strong>, AI For Humans is your weekly
              guide to understanding artificial intelligence. We cut through the hype, explain
              the tech, and focus on what actually matters — making AI accessible,
              entertaining, and useful for everyone.
            </p>
          </div>
        </motion.div>

        <div className="aifh-grid">
          <motion.div
            className="aifh-card podcast-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-header">
              <h3 className="card-title">The Podcast</h3>
              <div className="card-accent"></div>
            </div>
            <p className="card-description">
              Weekly episodes breaking down AI news, tools, and trends. From ChatGPT
              updates to groundbreaking research, we make it all understandable and
              entertaining.
            </p>
            <ul className="card-list">
              <li>In-depth AI news analysis</li>
              <li>Expert guest interviews</li>
              <li>Practical tool demonstrations</li>
              <li>Real-world applications</li>
            </ul>
            <div className="card-platforms">
              <a href="https://podcasts.apple.com/us/podcast/ai-for-humans-making-artificial-intelligence-fun-practical/id1682409647" target="_blank" rel="noopener noreferrer" className="platform">Apple Podcasts</a>
              <a href="https://open.spotify.com/show/5FId0qPP5SldltQTgVFTxq?si=15bcf12a853f48f7" target="_blank" rel="noopener noreferrer" className="platform">Spotify</a>
              <a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer" className="platform">YouTube</a>
            </div>
            <a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer" className="card-cta">Listen Now →</a>
          </motion.div>

          <motion.div
            className="aifh-card newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-header">
              <h3 className="card-title">The Newsletter</h3>
              <div className="card-accent"></div>
            </div>
            <p className="card-description">
              Weekly insights delivered straight to your inbox. Curated AI news, tools, and exclusive analysis.
            </p>
            <ul className="card-list">
              <li>Weekly AI roundup</li>
              <li>Tool reviews & recommendations</li>
              <li>Industry trends & predictions</li>
              <li>Exclusive subscriber content</li>
            </ul>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn newsletter-btn">Subscribe</button>
            </form>
            <div className="newsletter-footer">
              <a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="newsletter-archive">Past Issues →</a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="aifh-impact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="impact-content">
            <h3 className="impact-title">Why Listeners Trust Us</h3>
            <p className="impact-text">
              We don't just report on AI, we help you understand it. No hype, no fear-mongering,
              just honest conversations about the technology that's changing everything.
            </p>
          </div>
          <div className="impact-testimonials">
            <div className="testimonial">
              <p className="testimonial-text">
                "Hands-down the best pure AI podcast for everyday users, offering essential updates as the space rapidly evolves."
              </p>
              <p className="testimonial-author">— W. Nutt, Apple Podcasts</p>
            </div>
            <div className="testimonial">
              <p className="testimonial-text">
                "A great way to keep up with what's going on in the industry with a plain English lens. They're actually easy on the ears and funny too!"
              </p>
              <p className="testimonial-author">— jthakeus, Apple Podcasts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
