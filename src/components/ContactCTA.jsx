import { motion } from 'framer-motion';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section id="contact" className="contact-cta section">
      <div className="container">
        <motion.div
          className="contact-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-title">Let's Talk</h2>
          <p className="contact-text">
            Whether you need a fractional content leader, help integrating AI into your workflow,
            or a speaker for your next event — I'd love to hear what you're working on.
          </p>
          <a href="mailto:gavin@gavinpurcell.com" className="contact-email-btn btn btn-large">
            gavin@gavinpurcell.com
          </a>
          <p className="contact-expect">
            I'll reply within 48 hours and we'll set up a call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
