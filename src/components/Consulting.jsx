import { motion } from 'framer-motion';
import FAQ from './FAQ';
import './Consulting.css';

export default function Consulting() {
  const services = [
    {
      title: 'Media & Content Strategy',
      description: 'Build content that resonates. From traditional media to digital platforms, I help organizations create strategies that connect with audiences and drive results.',
      includes: [
        'Content strategy & development',
        'Audience growth & engagement',
        'Platform optimization',
        'Brand storytelling'
      ]
    },
    {
      title: 'Digital Transformation',
      description: 'Navigate the changing media landscape with confidence. I guide companies through digital evolution with practical strategies and hands-on expertise.',
      includes: [
        'Digital strategy development',
        'Organizational change management',
        'Team building & training',
        'Technology evaluation'
      ]
    },
    {
      title: 'AI & Emerging Technology',
      description: 'Understand and leverage AI without the hype. I help teams implement artificial intelligence in practical ways that add real value to their work.',
      includes: [
        'AI readiness assessment',
        'Tool evaluation & implementation',
        'Workflow integration',
        'Team education & training'
      ]
    },
    {
      title: 'Speaking & Workshops',
      description: 'Energize your team or audience with insights from two decades in media. From keynotes to workshops, I make complex topics accessible and actionable.',
      includes: [
        'Conference keynotes',
        'Executive workshops',
        'Team training sessions',
        'Custom presentations'
      ]
    }
  ];

  return (
    <section id="consulting" className="consulting section">
      <div className="container">
        <motion.div
          className="consulting-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="consulting-title">Let's Work Together</h2>
          <p className="consulting-subtitle">
            I partner with companies, teams, and leaders to navigate media transformation,
            build effective content strategies, and understand emerging technology.
            Whether you're looking to evolve your approach or tackle specific challenges,
            I bring strategic thinking and practical experience.
          </p>
          <div className="accent-line"></div>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-divider"></div>
              <h4 className="service-includes-title">What's Included:</h4>
              <ul className="service-includes">
                {service.includes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <FAQ />

        <motion.div
          id="contact"
          className="consulting-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cta-box">
            <h3 className="cta-box-title">Ready to Start a Conversation?</h3>
            <p className="cta-box-text">
              Whether you're facing a specific challenge or exploring opportunities,
              let's talk about how I can help your team succeed.
            </p>
            <p className="cta-box-email">gavin AT gavinpurcell.com</p>
            <div className="cta-box-actions">
              <a href="mailto:gavin@gavinpurcell.com" className="btn btn-large">Get In Touch</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
