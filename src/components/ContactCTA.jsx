import { motion } from 'framer-motion';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section id="contact" className="cta-section section">
      <div className="container">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-box-inner">
            <h2 className="cta-title">Let's Talk</h2>
            <p className="cta-text">
              Whether you need a fractional content leader, help integrating AI into your workflow,
              or a speaker for your next event — I'd love to hear what you're working on.
            </p>
            <a href="mailto:gavin@gavinpurcell.com" className="cta-email-btn">
              gavin@gavinpurcell.com
            </a>
            <p className="cta-expect">
              I'll reply within 48 hours and we'll set up a call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
