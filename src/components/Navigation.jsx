import { motion } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  return (
    <motion.nav
      className="nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="nav-logo-name">Gavin Purcell</span>
        </motion.div>

        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#aifh" className="nav-link">AI For Humans</a>
          <a href="#andthen" className="nav-link">AndThen</a>
          <a href="#consulting" className="nav-link">Work With Me</a>
          <a href="#contact" className="nav-link nav-link-cta">Get In Touch</a>
        </div>
      </div>
    </motion.nav>
  );
}
