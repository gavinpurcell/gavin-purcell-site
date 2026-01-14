import { motion } from 'framer-motion';
import './AndThen.css';

export default function AndThen() {
  return (
    <section id="andthen" className="andthen section">
      <div className="andthen-container">
        <motion.div
          className="andthen-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="andthen-logo-container">
            <a href="https://andthen.chat" target="_blank" rel="noopener noreferrer">
              <img
                src="/andthen-logo.png"
                alt="AndThen"
                className="andthen-logo"
              />
            </a>
          </div>

          <h3 className="andthen-tagline">Play The Conversation</h3>

          <p className="andthen-description">
            As Co-Founder of <strong>AndThen</strong>, I'm building the future of interactive
            audio storytelling. AndThen lets you control human-crafted audio experiences with
            your voice, creating entertainment that's both immersive and responsive to your choices.
          </p>

          <p className="andthen-description">
            We've built a custom AI pipeline and engine that allows for multiple AI agents to join you in an interactive conversation that you, the human control.
          </p>

          <p className="andthen-backing">
            Backed by <strong>a16z Speedrun</strong>, AndThen is pioneering a new medium that
            demonstrates how AI tools can enhance creativity rather than replace it.
          </p>
        </motion.div>

        <motion.div
          className="andthen-video"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="video-title">Watch the AndThen Launch Trailer</h3>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/VuPIJKa-_Ow"
              title="AndThen Launch Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
          <p className="video-caption">
            We used AI tools to create the launch trailer, including face-swapping ourselves into famous viral tech videos to explain what AndThen is all about.
          </p>
          <a href="https://andthen.chat" target="_blank" rel="noopener noreferrer" className="btn btn-large andthen-btn">
            Try AndThen →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
