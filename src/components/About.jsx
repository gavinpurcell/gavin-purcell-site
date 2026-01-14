import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  const highlights = [
    {
      image: '/highlight-1.png',
      title: 'Emmy-Winning Showrunner',
      description: 'Showrunner for The Tonight Show Starring Jimmy Fallon, creating innovative content that defined late-night digital presence',
      link: null
    },
    {
      image: '/highlight-2.png',
      title: 'Digital Media Pioneer',
      description: 'Built and led teams at Vox Media, G4, and many more media companies, transforming how audiences engage with digital content',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7299867738263416832/'
    },
    {
      image: '/highlight-3.png',
      title: 'Media Strategist',
      description: 'Guiding companies through media transformation with proven frameworks and hands-on experience',
      link: null
    },
    {
      image: '/highlight-4.png',
      title: 'Podcast Host',
      description: 'Co-host of AI For Humans with Kevin Pereira, making artificial intelligence accessible to millions',
      link: 'https://www.youtube.com/@AIForHumansShow'
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-title">
            Creating Content That Connects
            <span className="about-title-sub">Over Twenty Years of Experience</span>
          </h2>
          <div className="accent-line"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-intro">
              I've built a career creating content that resonates, from network television
              to digital media to podcasting.
            </p>
            <p>
              As Showrunner for <strong>The Tonight Show Starring Jimmy Fallon</strong>,
              I helped redefine what late-night television could be in the digital age.
              I've led creative teams at <strong>Vox Media</strong> and <strong>G4</strong>,
              launched shows that became cultural touchstones, and worked with everyone from
              major networks to innovative startups.
            </p>
            <p>
              My work has earned multiple <strong>Emmy awards</strong> and reached tens of millions
              of viewers across platforms. But what I'm most proud of is creating content
              that doesn't just perform well, it matters to people.
            </p>
            <p>
              These days, I'm helping others navigate the biggest shift in media and technology
              we've seen. As co-host of <strong>AI For Humans</strong> with Kevin Pereira,
              I break down artificial intelligence for a mainstream audience, cutting through
              the hype to focus on what's actually useful. And as Co-Founder of <strong>AndThen</strong>,
              I created my own AI audio start-up focusing on how to put these sorts of tools
              in a real product that's entertaining and educational.
            </p>
            <p>
              Whether I'm consulting, creating, or speaking, my goal remains the same: make complex things accessible and help people succeed in a changing landscape.
            </p>
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="highlights-grid">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="highlight-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="highlight-image-link">
                      <div className="highlight-image-container">
                        <img src={item.image} alt={item.title} className="highlight-image" />
                      </div>
                    </a>
                  ) : (
                    <div className="highlight-image-container">
                      <img src={item.image} alt={item.title} className="highlight-image" />
                    </div>
                  )}
                  <h4 className="highlight-title">{item.title}</h4>
                  <p className="highlight-description">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="stat">
            <div className="stat-number">20+</div>
            <div className="stat-label">Years in Media</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-number">Emmy</div>
            <div className="stat-label">Award Winner</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-number">100K+</div>
            <div className="stat-label">Audience Reach</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
