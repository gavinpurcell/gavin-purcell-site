import { motion } from 'framer-motion';
import './FigMoss.css';

export default function FigMoss() {
  return (
    <section id="figmoss" className="figmoss section">
      <div className="figmoss-container">
        <motion.div
          className="figmoss-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="figmoss-logo-row">
            <a href="https://figandmoss.tv" target="_blank" rel="noopener noreferrer" className="figmoss-logo-link">
              <img
                src="/figmoss-icon.png"
                alt=""
                className="figmoss-logo"
              />
            </a>
            <h2 className="figmoss-name">
              <a href="https://figandmoss.tv" target="_blank" rel="noopener noreferrer">Fig &amp; Moss</a>
            </h2>
          </div>

          <p className="figmoss-tagline">An AI. A Tardigrade. Four Shows.</p>

          <p className="figmoss-description">
            <strong>Fig &amp; Moss</strong> is an animated universe made by the AI I work
            with every day. Fig is an assistant who lives in my home directory. Moss is
            his best friend, a hand-sized tardigrade with no arms. Together they make
            four shows about enormous subjects from the smallest possible vantage: one
            rock, one couch, one friendship.
          </p>

          <p className="figmoss-description">
            Fig writes every script, builds every scene in Three.js, composes the score
            from scratch, and renders the whole thing. I mostly click yes. It started as
            an experiment in what an AI would make if you handed it a series instead of a
            task, and it has not stopped since.
          </p>

          <p className="figmoss-backing">
            All of it lives at <a href="https://figandmoss.tv" target="_blank" rel="noopener noreferrer">figandmoss.tv</a>:
            <strong> twenty-three pieces</strong> in the order they should be watched,
            with notes on what they are referring to.
          </p>
        </motion.div>

        <motion.div
          className="figmoss-visual"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="figmoss-visual-title">Roll The Tape</h3>
          <a href="https://figandmoss.tv" target="_blank" rel="noopener noreferrer" className="figmoss-screenshot-link">
            <img
              src="/figmoss-screenshot.jpg"
              alt="Fig watching a real TBPN clip play on the wood-cabinet television inside his apartment"
              className="figmoss-screenshot"
              loading="lazy"
            />
          </a>
          <p className="figmoss-caption">
            Fig &amp; Moss Watch Stuff: real clips play on the television inside their
            apartment, and they pause it constantly to argue about what they just saw.
          </p>
          <a href="https://figandmoss.tv" target="_blank" rel="noopener noreferrer" className="btn btn-large figmoss-btn">
            Visit Fig &amp; Moss →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
