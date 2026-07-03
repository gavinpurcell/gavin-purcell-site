import { motion } from 'framer-motion';
import FAQ from './FAQ';
import IntakeForm from './IntakeForm';
import './Consulting.css';

export default function Consulting() {
  const offers = [
    {
      tag: 'Workshop',
      title: 'The AI Jumpstart',
      description:
        'A half-day or full-day working session for creative and media teams. Not a lecture: your team leaves with working AI workflows built on your actual projects.',
      includes: [
        "Hands-on with your team's real work",
        'Tool stack recommendations you can defend',
        'Workflows your team keeps using Monday',
        'Follow-up playbook',
      ],
    },
    {
      tag: 'Ongoing Advisory',
      title: 'Fractional AI Creative Officer',
      description:
        'Senior AI leadership for your creative org without the full-time hire. A typical engagement runs three to six months: recurring working sessions with your team where we ship real workflows, not decks. Limited to a few teams at a time.',
      includes: [
        'Monthly strategy and roadmap sessions',
        'Tool and vendor evaluation',
        'Team upskilling plan',
        'Direct line to me between sessions',
      ],
    },
    {
      tag: 'On Stage',
      title: 'Keynotes and Speaking',
      description:
        'Two decades of TV plus daily hands-on AI, on your stage. Funny, practical, zero hype.',
      talksLabel: 'Current talks:',
      includes: [
        'AI for Actual Humans: What’s Real, What’s Hype, and What to Do About It',
        'The AI-Native Studio: How Creative Teams Will Work in 2027',
        'Custom talks built for your audience',
      ],
    },
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
            I work with media companies, entertainment brands, and creative teams that
            know AI matters but need someone who has actually shipped with it.
            Three ways in:
          </p>
          <div className="accent-line"></div>
        </motion.div>

        <div className="services-grid offers-grid">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="offer-tag">{offer.tag}</p>
              <h3 className="service-title">{offer.title}</h3>
              <p className="service-description">{offer.description}</p>
              <div className="service-divider"></div>
              <h4 className="service-includes-title">
                {offer.talksLabel || "What's Included:"}
              </h4>
              <ul className="service-includes">
                {offer.includes.map((item, i) => (
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
              Tell me what you're working on. The budget question just helps me
              point you at the right offer.
            </p>
            <IntakeForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
