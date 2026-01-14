import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="footer-logo">Gavin Purcell</h3>
              <p className="footer-tagline">
                Media Executive | Content Creator | Strategic Consultant
              </p>
              <p className="footer-description">
                Helping organizations and creators navigate media transformation
                with two decades of hands-on experience building content that connects.
              </p>
            </motion.div>

            <motion.div
              className="footer-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="footer-column">
                <h4 className="footer-column-title">Navigate</h4>
                <ul className="footer-nav">
                  <li><a href="#about">About</a></li>
                  <li><a href="#aifh">AI For Humans</a></li>
                  <li><a href="#andthen">AndThen</a></li>
                  <li><a href="#consulting">Work With Me</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">AI For Humans</h4>
                <ul className="footer-nav">
                  <li><a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer">Podcast</a></li>
                  <li><a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener noreferrer">Newsletter</a></li>
                  <li><a href="#aifh">Subscribe</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">AndThen</h4>
                <ul className="footer-nav">
                  <li><a href="https://andthen.chat" target="_blank" rel="noopener noreferrer">Visit AndThen</a></li>
                  <li><a href="mailto:partnerships@andthen.chat" target="_blank" rel="noopener noreferrer">Partnerships</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Connect</h4>
                <ul className="footer-social">
                  <li><a href="https://x.com/gavinpurcell" target="_blank" rel="noopener noreferrer" className="social-link">Twitter/X</a></li>
                  <li><a href="https://www.linkedin.com/in/gavin-purcell/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a></li>
                  <li><a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a></li>
                  <li><a href="mailto:gavin@gavinpurcell.com" className="social-link">Email</a></li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="footer-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="footer-cta-title">Let's Connect</h3>
            <p className="footer-cta-text">
              Have a project in mind? Want to discuss media strategy? Looking for a speaker?
              Reach out and let's start a conversation.
            </p>
            <div className="footer-cta-actions">
              <a href="mailto:gavin@gavinpurcell.com" className="btn btn-large">
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Gavin Purcell. All rights reserved.
            </p>
            <div className="footer-meta">
              <span>Built with care for storytelling and connection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
