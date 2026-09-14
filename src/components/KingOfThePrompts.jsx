import { motion } from 'framer-motion';
import './KingOfThePrompts.css';

export default function KingOfThePrompts() {
  return (
    <section id="kingoftheprompts" className="kotp section">
      <div className="kotp-container">
        <motion.div
          className="kotp-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="kotp-logo-row">
            <a href="https://kingoftheprompts.com" target="_blank" rel="noopener noreferrer" className="kotp-logo-link">
              <img
                src="/kotp-icon.png"
                alt=""
                className="kotp-logo"
              />
            </a>
            <h2 className="kotp-name">
              <a href="https://kingoftheprompts.com" target="_blank" rel="noopener noreferrer">King of the Prompts</a>
            </h2>
          </div>

          <p className="kotp-tagline">Two players. Thirty seconds. One crown.</p>

          <p className="kotp-description">
            <strong>King of the Prompts</strong> is a live game show for the prompt era.
            Two contestants get the same cue and thirty seconds to write a video prompt
            while the crowd watches every keystroke land. AI turns both prompts into
            five-second films on the spot. Then everybody votes.
          </p>

          <p className="kotp-description">
            First to two takes the match, and the winner stays on to defend the crown
            against whoever is next in the queue. When nobody is waiting, you play the
            House, an AI opponent that has been studying the rounds the crowd liked.
          </p>

          <p className="kotp-backing">
            It is live right now at <a href="https://kingoftheprompts.com" target="_blank" rel="noopener noreferrer">kingoftheprompts.com</a>,
            with <strong>a 500-cue deck</strong>, a leaderboard of the longest reigns,
            and fake commercials between matches. I designed and built it solo with AI
            coding agents, spec to live domain in five days.
          </p>
        </motion.div>

        <motion.div
          className="kotp-visual"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="kotp-visual-title">Match Complete</h3>
          <a href="https://kingoftheprompts.com" target="_blank" rel="noopener noreferrer" className="kotp-screenshot-link">
            <img
              src="/kotp-screenshot.jpg"
              alt="A finished King of the Prompts match on the cue The Museum of Humble Brags: two AI films side by side, gavin beat The House two rounds to none, and a card reads You won. Defend your crown."
              className="kotp-screenshot"
              loading="lazy"
            />
          </a>
          <p className="kotp-caption">
            The cue was "The Museum of Humble Brags." That's me on the left beating the
            House two rounds to nothing, and the card asking whether I want to defend
            the crown or abdicate the throne. Abdicate is a real button.
          </p>
          <a href="https://kingoftheprompts.com" target="_blank" rel="noopener noreferrer" className="btn btn-large kotp-btn">
            Play King of the Prompts →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
