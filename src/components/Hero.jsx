import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const rundown = [
  {
    title: 'AI For Humans',
    detail: 'Twice-weekly AI show with Kevin Pereira. New episodes Wednesday and Friday.',
    href: 'https://www.aiforhumans.show',
    cta: 'Watch',
  },
  // Fig & Moss rotated out of the rundown 9/14/26 to make room for King of the
  // Prompts. It still has its own full section further down and a footer link.
  {
    title: 'King of the Prompts',
    detail: 'Live game show. Two players, thirty seconds to write a video prompt, AI films both, the crowd picks the winner.',
    href: 'https://kingoftheprompts.com',
    cta: 'Play',
  },
  {
    title: 'The Fishbowl',
    detail: 'AI focus-group simulator. Designed, built, and shipped solo with AI coding agents.',
    href: 'https://fishbowl.show',
    cta: 'Try it',
  },
  // AndThen is deliberately not in the rundown: five cards wrapped The Tonight Show
  // onto an awkward second row. It still has its own full section further down.
  {
    title: 'The Tonight Show',
    detail: 'Emmy-winning showrunner. Two decades in TV and digital, 100M+ viewers reached.',
    href: '#about',
    cta: 'The story',
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* The eyebrow lives INSIDE the h1 so "Gavin Purcell" is part of the
              page's one top-level heading. This site has to rank for his own
              name, and the h1 previously didn't contain it. Nesting it costs
              nothing visually (see .hero-title .hero-eyebrow in Hero.css) and
              avoids saying the name twice in a row. */}
          <h1 className="hero-title">
            <span className="hero-eyebrow">Gavin Purcell · Creative Technologist</span>
            Your AI strategy needs <span className="hero-title-em">a showrunner.</span>
          </h1>
          <p className="hero-description">
            I ran <strong>The Tonight Show</strong>, won an Emmy, and co-host{' '}
            <strong>AI For Humans</strong>. Now I help media, entertainment, and creative
            teams actually ship with AI: strategy, workshops, and keynotes from someone
            who builds with this stuff every day.
          </p>
          <div className="hero-actions">
            <a href="#consulting" className="btn btn-large">Work With Me</a>
            <Link to="/work" className="btn btn-large btn-secondary">See the Work</Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-photo-card">
            <img
              src="/gavinpurcellheadshot.jpeg"
              alt="Gavin Purcell"
              className="hero-photo"
              width="800"
              height="1000"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-rundown"
        id="rundown"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="rundown-card">
          <div className="rundown-header">
            <span className="rundown-header-title">The Rundown</span>
            <span className="rundown-header-note">Proof of work</span>
          </div>
          <ul className="rundown-list">
            {rundown.map((item) => (
              <li key={item.title} className="rundown-item">
                <div className="rundown-item-body">
                  <h3 className="rundown-item-title">{item.title}</h3>
                  <p className="rundown-item-detail">{item.detail}</p>
                </div>
                <a
                  className="rundown-item-link"
                  href={item.href}
                  {...(item.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.cta}
                  <span aria-hidden="true"> →</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
