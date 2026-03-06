import { motion } from 'framer-motion';
import './CredibilityBar.css';

const logos = [
  { name: 'The Tonight Show', file: 'tonight-show.svg' },
  { name: 'NBC', file: 'nbc.svg' },
  { name: 'Vox Media', file: 'vox-media.svg' },
  { name: 'G4', file: 'g4.svg' },
  { name: 'a16z', file: 'a16z.svg' },
  { name: 'Fast Company', file: 'fast-company.svg' },
];

export default function CredibilityBar() {
  return (
    <motion.section
      className="credibility-bar"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="credibility-inner">
        {logos.map((logo) => (
          <div key={logo.name} className="credibility-logo">
            <img
              src={`/logos/${logo.file}`}
              alt={logo.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="credibility-text-fallback">{logo.name}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
