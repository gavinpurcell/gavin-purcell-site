import { motion } from 'framer-motion';
import './FractionalCCO.css';

export default function FractionalCCO() {
  return (
    <section id="work" className="fcco section">
      <div className="container">
        <motion.div
          className="fcco-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fcco-title">
            Your Fractional Chief Content Officer
          </h2>
          <div className="accent-line fcco-accent"></div>

          <div className="fcco-body">
            <p className="fcco-lead">
              I embed with your team to build and lead your content operation — strategy,
              team, workflow, output — without the overhead of a full-time executive hire.
            </p>
            <p>
              Whether you're an <strong>AI company</strong> that needs creative leadership to
              tell your story, a <strong>studio</strong> figuring out how AI fits into your
              production pipeline, or a <strong>brand</strong> building a media arm from scratch,
              I've done this before at the highest level and I can do it for you.
            </p>
          </div>

          <div className="fcco-cards">
            <div className="fcco-card">
              <h3>AI Companies</h3>
              <p>You have incredible technology. I help you build the content org that gets it in front of the right people — from product storytelling to creator programs to editorial strategy.</p>
            </div>
            <div className="fcco-card">
              <h3>Studios & Media</h3>
              <p>I've run content at scale (5 nights a week, 60-person team). I help studios integrate AI into production workflows without losing what makes the work great.</p>
            </div>
            <div className="fcco-card">
              <h3>Brands & Startups</h3>
              <p>Building a media operation from zero? I design the strategy, hire the team, set up the workflows, and get you producing — then hand off or stay on.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
