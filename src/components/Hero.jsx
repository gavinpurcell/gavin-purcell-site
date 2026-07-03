import { motion } from 'framer-motion';
import './Hero.css';

const rundown = [
  {
    title: 'AI For Humans',
    detail: 'Twice-weekly AI show with Kevin Pereira. New episodes Wednesday and Friday.',
    href: 'https://www.aiforhumans.show',
    cta: 'Watch',
  },
  {
    title: 'The Fishbowl',
    detail: 'AI focus-group simulator. Designed, built, and shipped solo with AI coding agents.',
    href: 'https://fishbowl.show',
    cta: 'Try it',
  },
  {
    title: 'AndThen',
    detail: 'Interactive audio storytelling startup. Backed by a16z Speedrun.',
    href: 'https://andthen.chat',
    cta: 'Play it',
  },
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
          <p className="hero-eyebrow">Gavin Purcell · Fractional AI Creative Officer</p>
          <h1 className="hero-title">
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
            <a href="#rundown" className="btn btn-large btn-secondary">See the Work</a>
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
