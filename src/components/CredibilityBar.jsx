import { motion } from 'framer-motion';
import './CredibilityBar.css';

const brands = [
  'The Tonight Show',
  'NBC',
  'Vox Media',
  'G4',
  'a16z',
  'Fast Company',
];

export default function CredibilityBar() {
  return (
    <motion.section
      className="credbar"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="credbar-inner">
        <span className="credbar-label">As seen at</span>
        <div className="credbar-logos">
          {brands.map((name) => (
            <span key={name} className="credbar-brand">{name}</span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
