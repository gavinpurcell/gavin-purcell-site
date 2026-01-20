import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Gavin Purcell offer?",
      answer: `Gavin offers four main services:

• Media & Content Strategy: Building content strategies that resonate across traditional and digital platforms
• Digital Transformation: Guiding companies through media evolution with practical, hands-on expertise
• AI & Emerging Technology: Implementing AI tools in practical ways that add real value to workflows
• Speaking & Workshops: Keynotes and training sessions on media, AI, and digital transformation

Most importantly, I approach all of this with a human-first lens and a good sense of humor... because navigating change shouldn't feel like a chore.`
    },
    {
      question: "How does Gavin approach AI consulting differently?",
      answer: `I've spent 20+ years actually creating content at scale, from The Tonight Show to digital media startups. I'm not a consultant who just reads about AI... I use it every day in production through AI For Humans and AndThen. That keeps me constantly up to date on the newest tools, models, and workflows as they emerge. I know what actually works versus what's just hype, and I focus on practical implementation that adds real value to your workflows, not buzzwords and theoretical frameworks.`
    },
    {
      question: "What's the typical engagement process?",
      answer: `We start with a conversation about your specific challenges and goals. If there's a good fit, I'll create a customized approach based on what you actually need, not a one-size-fits-all package. Engagements can range from a focused strategy session to ongoing advisory work. The outcome is always practical guidance that moves your team forward.`
    },
    {
      question: "Is Gavin available for speaking engagements?",
      answer: `Yes! I speak at conferences, company events, and team offsites on topics like AI in media, digital transformation, and content strategy. My talks focus on making complex topics accessible and actionable, with stories from two decades in the industry. Whether you need a keynote, workshop, or panel discussion, I tailor every presentation to your audience and goals. Reach out to discuss availability and topics.`
    },
    {
      question: "What industries has Gavin worked with?",
      answer: `I've worked across a wide range of industries over two decades. Television and streaming (The Tonight Show, major networks), digital media companies (Vox Media, G4), technology startups, gaming, and podcasting. My client experience includes Fortune 500 companies, media organizations, and early-stage startups. The common thread is helping teams create better content and navigate transformation, regardless of sector.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <motion.div
        className="faq-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="faq-title">Frequently Asked Questions</h3>
        <p className="faq-subtitle">Common questions about working together</p>
      </motion.div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className={`faq-question ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="faq-answer-content">
                    {faq.answer.split('\n').map((line, i) => {
                      // Check if line starts with bullet
                      if (line.trim().startsWith('•')) {
                        return <p key={i} className="faq-bullet-item">{line}</p>;
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
