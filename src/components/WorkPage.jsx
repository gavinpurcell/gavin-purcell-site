import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Page.css';
import './WorkPage.css';

const caseStudies = [
  {
    id: 'fishbowl',
    tag: 'Solo build · Shipped',
    name: 'The Fishbowl',
    tagline: 'Your idea. Four AI experts. One honest conversation.',
    problem:
      'Getting honest feedback on an idea usually means assembling a real focus group or calling in favors from industry friends: slow, expensive, and often too polite to be useful.',
    built:
      'An AI-powered focus group simulator. Assemble a panel of AI experts, drop in an idea or a full pitch deck, and watch them debate it live in a pixel-art roundtable, PixiJS scene and all. I designed and built the entire thing, from the scene to the panelist logic, with AI coding agents, solo.',
    shipped:
      'Free and open source at fishbowl.show, with the code on GitHub so anyone can run their own panel with their own API key.',
    lesson:
      'This is what one person can ship with these tools right now, not a slide about what AI could theoretically do.',
    image: '/fishbowl-screenshot.jpg',
    imageAlt: 'A Fishbowl session: four pixel-art AI panelists debating an idea around a roundtable',
    vitals: [
      { label: 'Role', value: 'Solo build' },
      { label: 'Stack', value: 'PixiJS, AI coding agents' },
      { label: 'Status', value: 'Live, open source' },
    ],
    links: [
      { label: 'Try The Fishbowl', href: 'https://fishbowl.show' },
      { label: 'Code on GitHub', href: 'https://github.com/gavinpurcell/the-fishbowl' },
    ],
  },
  {
    id: 'figmoss',
    tag: 'AI-native showrunner · Ongoing',
    name: 'Fig & Moss',
    tagline: 'An AI. A tardigrade. Seven shows.',
    problem:
      'What actually happens when you hand an AI a series to run instead of a single task? It is one thing to prompt a chatbot for a one-off clip, another to run it as an ongoing production with a cast, a look, and continuity.',
    built:
      'An animated universe made by the AI I work with every day. Fig writes every script, builds every scene in Three.js, composes the score from scratch, and renders the finished piece. My role is closer to showrunner than director: I greenlight, I mostly click yes, and I decide what makes the cut.',
    shipped:
      'Twenty-eight pieces live at figandmoss.tv, sequenced in watch order with notes on what each one is referencing. The most recent has the two of them watching Grand Theft Auto VI the afternoon it hit Netflix.',
    lesson:
      'Running an ongoing show the way you would run a writers’ room, except the whole room is one AI. That is the "AI-native showrunner" half of the job.',
    image: '/figmoss-screenshot.jpg',
    imageAlt: 'Fig, a small figure with a gold fig-leaf head, sits on a green couch beside Moss, a green tardigrade',
    vitals: [
      { label: 'Role', value: 'Showrunner' },
      { label: 'Stack', value: 'Three.js, AI-written scripts & score' },
      { label: 'Status', value: 'Ongoing, 28 pieces' },
    ],
    links: [{ label: 'Visit Fig & Moss', href: 'https://figandmoss.tv' }],
  },
  {
    id: 'andthen',
    tag: 'Co-Founder · a16z Speedrun',
    name: 'AndThen',
    tagline: 'Play the conversation.',
    problem:
      'Audio storytelling has stayed a passive medium. Voice control and AI agents made it possible to build something a listener could steer instead of just hear.',
    built:
      'A custom AI pipeline and engine that lets multiple AI agents join a listener inside an interactive, voice-controlled conversation, so the story responds to what you actually say instead of following a fixed script.',
    shipped:
      'Backed by a16z Speedrun. We even built our own launch trailer with AI tools, including face-swapping ourselves into famous viral tech videos to explain the product.',
    lesson:
      'AI tools should sharpen creative craft, not replace the people doing it.',
    image: 'https://img.youtube.com/vi/VuPIJKa-_Ow/hqdefault.jpg',
    imageAlt: 'Still from the AndThen launch trailer',
    vitals: [
      { label: 'Role', value: 'Co-Founder' },
      { label: 'Stack', value: 'Custom AI pipeline, voice control' },
      { label: 'Status', value: 'Backed by a16z Speedrun' },
    ],
    links: [{ label: 'Try AndThen', href: 'https://andthen.chat' }],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Work | Gavin Purcell, Creative Technologist',
  url: 'https://gavinpurcell.com/work',
  about: { '@type': 'Person', name: 'Gavin Purcell' },
  mainEntity: caseStudies.map((c) => ({
    '@type': 'CreativeWork',
    name: c.name,
    description: c.built,
    url: c.links[0].href,
    creator: { '@type': 'Person', name: 'Gavin Purcell' },
  })),
};

export default function WorkPage() {
  return (
    <main id="main" className="page">
      <Helmet>
        <title>Work | Gavin Purcell, Creative Technologist</title>
        <meta
          name="description"
          content="Case studies from Gavin Purcell, creative technologist: The Fishbowl, Fig & Moss, and AndThen. What the problem was, what got built, and what shipped."
        />
        <link rel="canonical" href="https://gavinpurcell.com/work" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="page-inner work-inner">
        <span className="page-eyebrow">Creative Technologist</span>
        <h1 className="page-title">The Work</h1>
        <hr className="page-rule" />

        <p className="page-lede">
          I turn new AI models into working shows, characters, tools, and production
          workflows. Not decks, not demos: things that ship and keep running. Here is the
          proof.
        </p>

        <div className="work-list">
          {caseStudies.map((study) => (
            <article key={study.id} id={study.id} className="page-card work-card">
              <div className="work-card-grid">
                <div className="work-card-content">
                  <p className="work-card-tag">{study.tag}</p>
                  <h2 className="work-card-name">{study.name}</h2>
                  <p className="work-card-tagline">{study.tagline}</p>

                  <h3>The problem</h3>
                  <p>{study.problem}</p>

                  <h3>What I built</h3>
                  <p>{study.built}</p>

                  <h3>Shipped</h3>
                  <p>{study.shipped}</p>

                  <h3>Lesson</h3>
                  <p>{study.lesson}</p>

                  <div className="work-card-links">
                    {study.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="page-cta work-card-link"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                </div>

                <div className="work-card-visual">
                  <a
                    href={study.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-card-image-link"
                  >
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      loading="lazy"
                      className="work-card-image"
                    />
                  </a>
                  <dl className="work-card-vitals">
                    {study.vitals.map((v) => (
                      <div key={v.label}>
                        <dt>{v.label}</dt>
                        <dd>{v.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <blockquote className="work-card-pullquote">
                    &ldquo;{study.lesson}&rdquo;
                  </blockquote>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="page-body work-credibility">
          <h2>And I do it in public, twice a week</h2>
          <p>
            Alongside the builds, I co-host{' '}
            <a href="https://aiforhumans.show" target="_blank" rel="noopener noreferrer">
              AI For Humans
            </a>{' '}
            with Kevin Pereira: a twice-weekly show breaking down what is actually happening
            in AI, not the hype cycle. It is how I stay sharp enough to keep building this
            stuff instead of just talking about it.
          </p>
        </div>

        <p className="page-meta">
          Want something like this built for your team?{' '}
          <Link to="/contact">Get in touch</Link>, or see{' '}
          <a href="/#consulting">how we could work together</a>.
        </p>
      </div>
    </main>
  );
}
