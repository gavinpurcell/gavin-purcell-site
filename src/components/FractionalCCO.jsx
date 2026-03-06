import { motion } from 'framer-motion';
import './FractionalCCO.css';

export default function FractionalCCO() {
  return (
    <section id="fractional" className="fcco section">
      <div className="fcco-bg-accent" />
      <div className="container">
        <motion.div
          className="fcco-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="fcco-eyebrow">Now Available</span>
          <h2 className="fcco-title">
            Your Fractional<br />
            <span className="fcco-title-accent">Chief Content Officer</span>
          </h2>
        </motion.div>

        <motion.div
          className="fcco-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="fcco-lead">
            I embed with your team to build and lead your content operation — strategy,
            team, workflow, output — without the overhead of a full-time executive hire.
          </p>
          <p className="fcco-sub">
            Whether you're an AI company that needs creative leadership, a studio
            figuring out how AI fits into production, or a brand building a media arm
            from scratch — I've done this before at the highest level.
          </p>
        </motion.div>

        <div className="fcco-cards">
          <motion.div
            className="fcco-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
          >
            <div className="fcco-card-number">01</div>
            <h3>AI Companies</h3>
            <p>You have incredible technology. I help you build the content org that gets it in front of the right people — from product storytelling to creator programs to editorial strategy.</p>
          </motion.div>

          <motion.div
            className="fcco-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
          >
            <div className="fcco-card-number">02</div>
            <h3>Studios & Media</h3>
            <p>I've run content at scale (5 nights a week, 60-person team). I help studios integrate AI into production workflows without losing what makes the work great.</p>
          </motion.div>

          <motion.div
            className="fcco-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
          >
            <div className="fcco-card-number">03</div>
            <h3>Brands & Startups</h3>
            <p>Building a media operation from zero? I design the strategy, hire the team, set up the workflows, and get you producing — then hand off or stay on.</p>
          </motion.div>
        </div>

        <motion.div
          className="fcco-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#contact" className="btn btn-large fcco-btn">Let's Talk About Your Content</a>
        </motion.div>
      </div>
    </section>
  );
}
