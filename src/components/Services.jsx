import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    icon: '01',
    title: 'Fractional CCO',
    subtitle: 'Content Leadership',
    description: 'I embed with your team as your Chief Content Officer — build the strategy, hire the people, design the workflows, oversee the output. Full leadership, flexible commitment.',
  },
  {
    icon: '02',
    title: 'AI Strategy',
    subtitle: 'Implementation & Training',
    description: 'Practical AI integration for content and media teams. I evaluate tools, design workflows, train your people, and make sure AI actually makes your work better — not just different.',
  },
  {
    icon: '03',
    title: 'Speaking & Workshops',
    subtitle: 'Keynotes & Team Sessions',
    description: 'Two decades of stories from The Tonight Show to AI startups, made actionable for your team or audience. Conferences, offsites, executive workshops.',
  },
];

export default function Services() {
  return (
    <section id="consulting" className="svc section">
      <div className="container">
        <motion.div
          className="svc-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="svc-title">
            How We Can
            <span className="svc-title-accent"> Work Together</span>
          </h2>
          <div className="accent-line"></div>
        </motion.div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="svc-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="svc-card-icon">{s.icon}</div>
              <h3 className="svc-card-title">{s.title}</h3>
              <span className="svc-card-subtitle">{s.subtitle}</span>
              <p className="svc-card-desc">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
