import { motion } from 'framer-motion';
import './CurrentProjects.css';

export default function CurrentProjects() {
  return (
    <section className="projects section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-title">What I'm Building Now</h2>
          <div className="accent-line"></div>
        </motion.div>

        <div className="projects-grid">
          <motion.a
            href="https://aiforhumans.show"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src="/aifh-logo.png" alt="AI For Humans" className="project-logo" />
            <div className="project-info">
              <h3>AI For Humans</h3>
              <p className="project-role">Co-Host with Kevin Pereira</p>
              <p>Weekly AI podcast with 35K+ YouTube subscribers. Fast Company called it "the most entertaining way to learn about AI." I use and test every major AI tool so I can speak about them with authority.</p>
            </div>
            <span className="project-arrow">&rarr;</span>
          </motion.a>

          <motion.a
            href="https://andthen.chat"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/andthen-logo.png" alt="AndThen" className="project-logo" />
            <div className="project-info">
              <h3>AndThen</h3>
              <p className="project-role">Co-Founder</p>
              <p>AI-powered interactive audio platform backed by a16z Speedrun. Built a custom AI pipeline from scratch — proof I don't just talk about AI, I ship products with it.</p>
            </div>
            <span className="project-arrow">&rarr;</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
