import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    title: 'Fractional CCO',
    subtitle: 'Content Leadership',
    description: 'I embed with your team as your Chief Content Officer — build the strategy, hire the people, design the workflows, oversee the output. Full leadership, flexible commitment.',
  },
  {
    title: 'AI Strategy',
    subtitle: 'Implementation',
    description: 'Practical AI integration for content and media teams. I evaluate tools, design workflows, train your people, and make sure AI actually makes your work better — not just different.',
  },
  {
    title: 'Speaking',
    subtitle: 'Workshops',
    description: 'Keynotes and workshops on AI, media, and content strategy. Two decades of stories from the front lines, made actionable for your team or audience.',
  },
];

export default function Services() {
  return (
    <section className="services section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="services-title">How We Can Work Together</h2>
          <div className="accent-line"></div>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="service-name">{s.title}</h3>
              <span className="service-subtitle">{s.subtitle}</span>
              <p className="service-desc">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
