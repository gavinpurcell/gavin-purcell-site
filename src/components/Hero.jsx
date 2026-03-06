import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="hero-title">
            I build content organizations at the intersection of
            <span className="hero-highlight"> media and AI.</span>
          </h1>

          <p className="hero-description">
            Emmy-winning showrunner. AI startup founder. I help companies build content
            strategies, teams, and workflows that actually work — from the C-suite to the edit bay.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-large">
              See My Work
            </a>
            <a href="#contact" className="btn btn-large btn-secondary">
              Work With Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="photo-card">
            <img
              src="/gavin-photo.png"
              alt="Gavin Purcell"
              className="photo-main"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
