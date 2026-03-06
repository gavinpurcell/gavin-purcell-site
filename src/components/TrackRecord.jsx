import { motion } from 'framer-motion';
import './TrackRecord.css';

const achievements = [
  {
    stat: 'The Tonight Show',
    role: 'Showrunner',
    detail: 'Led a 60-person creative team producing 5 nights of content per week, reaching 10M+ viewers. Redefined late-night\'s digital presence.',
  },
  {
    stat: 'Vox Media & G4',
    role: 'Content Leadership',
    detail: 'Built and scaled digital content organizations at two of media\'s most innovative companies. Launched shows that became cultural touchstones.',
  },
  {
    stat: 'AI For Humans',
    role: 'Co-Host & Co-Founder',
    detail: '35K+ YouTube subscribers. A top-ranked AI podcast. Fast Company called it "the most entertaining way to learn about AI."',
  },
  {
    stat: 'AndThen',
    role: 'Co-Founder',
    detail: 'Built an AI-powered interactive audio platform. Backed by a16z Speedrun. Shipped a product that puts AI tools in the hands of creators.',
  },
];

export default function TrackRecord() {
  return (
    <section className="track section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="track-title">Track Record</h2>
          <div className="accent-line"></div>
          <p className="track-intro">
            20+ years building content at every level — from writers' rooms to boardrooms,
            from network television to AI startups.
          </p>
        </motion.div>

        <div className="track-grid">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              className="track-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="track-card-stat">{a.stat}</h3>
              <span className="track-card-role">{a.role}</span>
              <p className="track-card-detail">{a.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
