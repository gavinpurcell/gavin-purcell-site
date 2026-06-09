import { motion } from 'framer-motion';
import './Fishbowl.css';

export default function Fishbowl() {
  return (
    <section id="fishbowl" className="fishbowl section">
      <div className="fishbowl-container">
        <motion.div
          className="fishbowl-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="fishbowl-logo-container">
            <a href="https://fishbowl.show" target="_blank" rel="noopener noreferrer">
              <img
                src="/fishbowl-icon.png"
                alt="The Fishbowl"
                className="fishbowl-logo"
              />
            </a>
          </div>

          <h2 className="fishbowl-tagline">Your Idea. Four AI Experts. One Honest Conversation.</h2>

          <p className="fishbowl-description">
            <strong>The Fishbowl</strong> is an AI-powered focus group simulator I designed
            and built. Assemble a panel of AI experts, drop in your idea (or a whole pitch
            deck), and watch them debate it live in a pixel-art roundtable. Jump in with
            your own questions, then walk away with an honest debrief.
          </p>

          <p className="fishbowl-description">
            I built the entire thing with AI coding agents, from the PixiJS scene to the
            panelist brains, and shipped it solo. It's my proof-of-work for what one person
            can make with these tools right now.
          </p>

          <p className="fishbowl-backing">
            The Fishbowl is <strong>free to use</strong> and <strong>open source</strong>,
            so you can <a href="https://github.com/gavinpurcell/the-fishbowl" target="_blank" rel="noopener noreferrer">grab the code on GitHub</a> and
            run your own panel with your own API key.
          </p>
        </motion.div>

        <motion.div
          className="fishbowl-visual"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="fishbowl-visual-title">Step Up To The Glass</h3>
          <a href="https://fishbowl.show" target="_blank" rel="noopener noreferrer" className="fishbowl-screenshot-link">
            <img
              src="/fishbowl-screenshot.jpg"
              alt="A Fishbowl session: four pixel-art AI panelists debating an idea around a roundtable"
              className="fishbowl-screenshot"
              loading="lazy"
            />
          </a>
          <p className="fishbowl-caption">
            Four AI panelists mid-debate. Every session gets a different panel, a real
            argument, and a written debrief you can export.
          </p>
          <a href="https://fishbowl.show" target="_blank" rel="noopener noreferrer" className="btn btn-large fishbowl-btn">
            Try The Fishbowl →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
