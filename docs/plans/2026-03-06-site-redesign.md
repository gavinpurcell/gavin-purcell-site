# gavinpurcell.com Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reposition gavinpurcell.com from personal brand showcase to an inbound-generating site for fractional CCO work and consulting.

**Architecture:** Single-page React app (Vite). Replace existing component stack with new sections. Reuse existing CSS variable system (neo-brutalist theme). No new dependencies needed.

**Tech Stack:** React 19, Vite 7, Framer Motion, existing CSS custom properties

---

### Task 1: Create preview branch and scaffold new Home layout

**Files:**
- Modify: `src/components/Home.jsx`

**Step 1: Create branch**

```bash
cd ~/gavin-purcell-site
git checkout -b preview/site-redesign
```

**Step 2: Update Home.jsx with new section order**

Replace current imports and layout with:

```jsx
import Hero from './Hero';
import CredibilityBar from './CredibilityBar';
import FractionalCCO from './FractionalCCO';
import TrackRecord from './TrackRecord';
import CurrentProjects from './CurrentProjects';
import Services from './Services';
import ContactCTA from './ContactCTA';

function Home() {
  return (
    <main>
      <Hero />
      <CredibilityBar />
      <FractionalCCO />
      <TrackRecord />
      <CurrentProjects />
      <Services />
      <ContactCTA />
    </main>
  );
}

export default Home;
```

**Step 3: Commit**

```bash
git add src/components/Home.jsx
git commit -m "scaffold: new homepage layout for redesign"
```

---

### Task 2: Rewrite Hero section

**Files:**
- Rewrite: `src/components/Hero.jsx`
- Rewrite: `src/components/Hero.css`

**Step 1: Replace Hero.jsx**

New Hero: positioning headline, sub-copy, photo (static), two CTAs. No AI toy.

```jsx
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="hero-title">
            I build content organizations at the intersection of
            <span className="hero-highlight"> media and AI.</span>
          </h1>

          <p className="hero-description">
            Emmy-winning showrunner. AI startup founder. I help companies build content
            strategies, teams, and workflows that actually work — from the C-suite to the edit bay.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-large">
              See My Work
            </a>
            <a href="#contact" className="btn btn-large btn-secondary">
              Work With Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="photo-card">
            <img
              src="/gavin-photo.png"
              alt="Gavin Purcell"
              className="photo-main"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Replace Hero.css**

Keep neo-brutalist photo card styling, strip all AI toy styles.

```css
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  position: relative;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: var(--space-xl);
  align-items: center;
}

.hero-title {
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  margin-bottom: var(--space-md);
  line-height: 1.15;
  font-weight: 400;
}

.hero-highlight {
  color: var(--color-primary);
  font-style: italic;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
  max-width: 600px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: var(--space-sm);
}

.photo-card {
  background: var(--color-surface);
  border: var(--border-width) var(--border-style);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.photo-main {
  width: 100%;
  display: block;
}

@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    text-align: center;
  }

  .hero-visual {
    max-width: 350px;
    margin: 0 auto;
    order: -1;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}
```

**Step 3: Verify it builds**

```bash
cd ~/gavin-purcell-site && npm run build
```

**Step 4: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css
git commit -m "feat: rewrite hero with positioning headline, remove AI toy"
```

---

### Task 3: Create Credibility Bar

**Files:**
- Create: `src/components/CredibilityBar.jsx`
- Create: `src/components/CredibilityBar.css`

**Step 1: Source logo SVGs**

Download or create SVG logos for credibility bar. Place in `public/logos/`. For brands where SVGs are hard to source, use clean text treatments. Target logos: The Tonight Show / NBC, Vox Media, G4, a16z, Fast Company.

**Step 2: Create CredibilityBar.jsx**

```jsx
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
```

**Step 3: Create CredibilityBar.css**

```css
.credibility-bar {
  border-top: var(--border-width) var(--border-style);
  border-bottom: var(--border-width) var(--border-style);
  padding: var(--space-md) var(--space-md);
  background: var(--color-surface);
}

.credibility-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.credibility-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.credibility-logo img {
  height: 32px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: opacity 0.2s;
}

.credibility-logo img:hover {
  opacity: 1;
}

.credibility-text-fallback {
  display: none;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .credibility-inner {
    justify-content: center;
    gap: var(--space-md);
  }

  .credibility-logo img {
    height: 24px;
  }
}
```

**Step 4: Source/create logo SVGs**

Place logos in `public/logos/`. Use WebSearch or manual creation for each. Text fallbacks will render if SVGs are missing.

**Step 5: Commit**

```bash
mkdir -p public/logos
git add src/components/CredibilityBar.jsx src/components/CredibilityBar.css public/logos/
git commit -m "feat: add credibility bar with logo strip"
```

---

### Task 4: Create Fractional CCO section

**Files:**
- Create: `src/components/FractionalCCO.jsx`
- Create: `src/components/FractionalCCO.css`

**Step 1: Create FractionalCCO.jsx**

```jsx
import { motion } from 'framer-motion';
import './FractionalCCO.css';

export default function FractionalCCO() {
  return (
    <section id="work" className="fcco section">
      <div className="container">
        <motion.div
          className="fcco-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fcco-title">
            Your Fractional Chief Content Officer
          </h2>
          <div className="accent-line"></div>

          <div className="fcco-body">
            <p className="fcco-lead">
              I embed with your team to build and lead your content operation — strategy,
              team, workflow, output — without the overhead of a full-time executive hire.
            </p>
            <p>
              Whether you're an <strong>AI company</strong> that needs creative leadership to
              tell your story, a <strong>studio</strong> figuring out how AI fits into your
              production pipeline, or a <strong>brand</strong> building a media arm from scratch,
              I've done this before at the highest level and I can do it for you.
            </p>
          </div>

          <div className="fcco-cards">
            <div className="fcco-card">
              <h3>AI Companies</h3>
              <p>You have incredible technology. I help you build the content org that gets it in front of the right people — from product storytelling to creator programs to editorial strategy.</p>
            </div>
            <div className="fcco-card">
              <h3>Studios & Media</h3>
              <p>I've run content at scale (5 nights a week, 60-person team). I help studios integrate AI into production workflows without losing what makes the work great.</p>
            </div>
            <div className="fcco-card">
              <h3>Brands & Startups</h3>
              <p>Building a media operation from zero? I design the strategy, hire the team, set up the workflows, and get you producing — then hand off or stay on.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Create FractionalCCO.css**

```css
.fcco {
  background: var(--color-bg-dark);
  color: var(--color-bg);
}

.fcco .accent-line {
  background: var(--color-primary);
}

.fcco-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: var(--space-sm);
}

.fcco-body {
  max-width: 700px;
  margin-bottom: var(--space-xl);
}

.fcco-lead {
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

.fcco-body p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #ccc;
}

.fcco-body strong {
  color: var(--color-primary-light);
}

.fcco-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.fcco-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  padding: var(--space-md);
}

.fcco-card h3 {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary-light);
  margin-bottom: var(--space-sm);
}

.fcco-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #aaa;
}

@media (max-width: 768px) {
  .fcco-cards {
    grid-template-columns: 1fr;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/FractionalCCO.jsx src/components/FractionalCCO.css
git commit -m "feat: add fractional CCO section"
```

---

### Task 5: Create Track Record section

**Files:**
- Create: `src/components/TrackRecord.jsx`
- Create: `src/components/TrackRecord.css`

**Step 1: Create TrackRecord.jsx**

Results-oriented, not resume-oriented. Punchy stat cards with context.

```jsx
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
```

**Step 2: Create TrackRecord.css**

```css
.track-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: var(--space-sm);
}

.track-intro {
  font-size: 1.2rem;
  color: var(--color-text-light);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.track-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.track-card {
  background: var(--color-surface);
  border: var(--border-width) var(--border-style);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.track-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.track-card-stat {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.track-card-role {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-light);
  margin-bottom: var(--space-sm);
}

.track-card-detail {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .track-grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/TrackRecord.jsx src/components/TrackRecord.css
git commit -m "feat: add track record section with achievement cards"
```

---

### Task 6: Create Current Projects section

**Files:**
- Create: `src/components/CurrentProjects.jsx`
- Create: `src/components/CurrentProjects.css`

**Step 1: Create CurrentProjects.jsx**

Compact section — AI For Humans + AndThen as credentials, not showcases.

```jsx
import { motion } from 'framer-motion';
import './CurrentProjects.css';

export default function CurrentProjects() {
  return (
    <section className="projects section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-title">What I'm Building Now</h2>
          <div className="accent-line"></div>
        </motion.div>

        <div className="projects-grid">
          <motion.a
            href="https://aiforhumans.show"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src="/aifh-logo.png" alt="AI For Humans" className="project-logo" />
            <div className="project-info">
              <h3>AI For Humans</h3>
              <p className="project-role">Co-Host with Kevin Pereira</p>
              <p>Weekly AI podcast with 35K+ YouTube subscribers. Fast Company called it "the most entertaining way to learn about AI." I use and test every major AI tool so I can speak about them with authority.</p>
            </div>
            <span className="project-arrow">&rarr;</span>
          </motion.a>

          <motion.a
            href="https://andthen.chat"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/andthen-logo.png" alt="AndThen" className="project-logo" />
            <div className="project-info">
              <h3>AndThen</h3>
              <p className="project-role">Co-Founder</p>
              <p>AI-powered interactive audio platform backed by a16z Speedrun. Built a custom AI pipeline from scratch — proof I don't just talk about AI, I ship products with it.</p>
            </div>
            <span className="project-arrow">&rarr;</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create CurrentProjects.css**

```css
.projects-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: var(--space-sm);
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.project-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-surface);
  border: var(--border-width) var(--border-style);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.project-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
}

.project-info h3 {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.project-role {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.project-info p:last-child {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-light);
}

.project-arrow {
  font-size: 1.5rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-left: auto;
}

@media (max-width: 768px) {
  .project-card {
    flex-direction: column;
    text-align: center;
  }

  .project-arrow {
    display: none;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/CurrentProjects.jsx src/components/CurrentProjects.css
git commit -m "feat: add compact current projects section"
```

---

### Task 7: Create Services section

**Files:**
- Create: `src/components/Services.jsx`
- Create: `src/components/Services.css`

**Step 1: Create Services.jsx**

Three focused cards. No generic filler.

```jsx
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
```

**Step 2: Create Services.css**

```css
.services {
  background: var(--color-bg);
}

.services-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: var(--space-sm);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.service-card {
  background: var(--color-surface);
  border: var(--border-width) var(--border-style);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}

.service-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.service-subtitle {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-light);
  margin-bottom: var(--space-sm);
}

.service-desc {
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/Services.jsx src/components/Services.css
git commit -m "feat: add focused services section (3 cards)"
```

---

### Task 8: Create Contact CTA section

**Files:**
- Create: `src/components/ContactCTA.jsx`
- Create: `src/components/ContactCTA.css`

**Step 1: Create ContactCTA.jsx**

```jsx
import { motion } from 'framer-motion';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section id="contact" className="contact-cta section">
      <div className="container">
        <motion.div
          className="contact-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-title">Let's Talk</h2>
          <p className="contact-text">
            Whether you need a fractional content leader, help integrating AI into your workflow,
            or a speaker for your next event — I'd love to hear what you're working on.
          </p>
          <a href="mailto:gavin@gavinpurcell.com" className="contact-email-btn btn btn-large">
            gavin@gavinpurcell.com
          </a>
          <p className="contact-expect">
            I'll reply within 48 hours and we'll set up a call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Create ContactCTA.css**

```css
.contact-cta {
  background: var(--color-bg-dark);
  color: var(--color-bg);
}

.contact-box {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.contact-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--space-md);
}

.contact-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #ccc;
  margin-bottom: var(--space-lg);
}

.contact-email-btn {
  display: inline-block;
  font-size: 1.25rem;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  font-weight: 700;
  border: var(--border-width) solid var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.contact-email-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.contact-expect {
  margin-top: var(--space-md);
  font-size: 0.95rem;
  color: #999;
  font-style: italic;
}

@media (max-width: 768px) {
  .contact-email-btn {
    font-size: 1rem;
    padding: var(--space-sm) var(--space-md);
  }
}
```

**Step 3: Commit**

```bash
git add src/components/ContactCTA.jsx src/components/ContactCTA.css
git commit -m "feat: add contact CTA section"
```

---

### Task 9: Source logos for credibility bar

**Files:**
- Create: `public/logos/tonight-show.svg`
- Create: `public/logos/nbc.svg`
- Create: `public/logos/vox-media.svg`
- Create: `public/logos/g4.svg`
- Create: `public/logos/a16z.svg`
- Create: `public/logos/fast-company.svg`

**Step 1:** Search for and download SVG logos for each brand. If not available as clean SVGs, create simple text-based SVG logos that match the brand name in a clean sans-serif font.

**Step 2: Commit**

```bash
git add public/logos/
git commit -m "feat: add credibility bar logos"
```

---

### Task 10: Clean up unused components

**Files:**
- Keep but don't import: `FAQ.jsx`, `FAQ.css`, `FeaturedBlogPost.jsx`, `FeaturedBlogPost.css`
- Verify: old `Consulting.jsx`, `About.jsx`, `AndThen.jsx`, `AIForHumans.jsx` are no longer imported

**Step 1:** Verify `Home.jsx` only imports the new components. Old files remain in the repo but are not imported (can be deleted later if Gavin confirms).

**Step 2:** Build and verify

```bash
cd ~/gavin-purcell-site && npm run build
```

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: verify clean build, unused components not imported"
```

---

### Task 11: Preview deploy

**Step 1:** Run local dev server to verify

```bash
cd ~/gavin-purcell-site && npm run dev
```

**Step 2:** Once confirmed good, deploy preview (do NOT push to main)

```bash
npx vercel
```

Share preview URL with Gavin for review.
