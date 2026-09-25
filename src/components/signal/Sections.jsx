import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../FAQ';
import IntakeForm from '../IntakeForm';
import { fetchPosts } from '../../services/wordpress';
import latestEpisode from '../../data/latest-episode.json';
import DitherPreview from './DitherPreview';
import VideoFacade from './VideoFacade';

/* ------------------------------------------------------------------ */

const facts = [
  { what: 'The Tonight Show Starring Jimmy Fallon', role: 'Showrunner. Emmy winner.' },
  { what: 'AI For Humans', role: 'Co-host with Kevin Pereira, twice a week.' },
  { what: 'AndThen', role: 'Co-founder. Interactive audio, backed by a16z Speedrun.' },
  { what: 'Vox Media and G4', role: 'Led creative teams across TV and digital.' },
  { what: '100M+ viewers', role: 'Reached across platforms over twenty years.' },
];

export function Intro() {
  return (
    <section id="about" className="section-block intro">
      <p className="intro-lede">
        I've spent twenty years making things people watch, from network television to
        digital media to podcasting. These days I build with AI every day, and help
        creative teams do the same without the hype.
        <Link to="/about" className="intro-more">The longer version</Link>
      </p>
      <dl className="facts">
        {facts.map((f) => (
          <div key={f.what} className="fact">
            <dt>{f.what}</dt>
            <dd>{f.role}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */

// Baked in at build time by scripts/fetch-latest-episode.mjs; the live
// /api/latest-episode check below only upgrades it if something newer is out.
const FALLBACK_EPISODE_ID = latestEpisode.videoId;

export function AIForHumansBlock() {
  const [email, setEmail] = useState('');
  const [videoId, setVideoId] = useState(FALLBACK_EPISODE_ID);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/latest-episode')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.videoId) setVideoId(data.videoId);
      })
      .catch(() => {}); // keep fallback
    return () => {
      cancelled = true;
    };
  }, []);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    window.open(
      `https://magic.beehiiv.com/v1/49f89fc8-db2d-413c-9350-0f92f8b7db32?email=${encodeURIComponent(email)}`,
      '_blank'
    );
    setEmail('');
  };

  return (
    <section id="aifh" className="section-block aifh">
      <div className="block-head">
        <h2 className="block-title">AI For Humans</h2>
        <p className="block-note">New episodes every Wednesday and Friday.</p>
      </div>
      <div className="aifh-grid">
        <div>
          <VideoFacade key={videoId} videoId={videoId} title={videoId === latestEpisode.videoId ? latestEpisode.title : ''} />
          {videoId === latestEpisode.videoId && latestEpisode.title && (
            <p className="episode-title">Latest: {latestEpisode.title}</p>
          )}
        </div>
        <div className="aifh-side">
          <p className="aifh-copy">
            Co-hosted with Kevin Pereira, AI For Humans is a twice-weekly guide to understanding
            artificial intelligence. We cut through the hype, explain the tech, and focus on what
            actually matters: making AI accessible, entertaining, and useful for everyone.
          </p>
          <blockquote className="aifh-quote">
            <p>“Hands-down the best pure AI podcast for everyday users.”</p>
            <cite>W. Nutt, Apple Podcasts review</cite>
          </blockquote>
          <ul className="listen">
            <li><a href="https://www.youtube.com/@AIForHumansShow" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://podcasts.apple.com/us/podcast/ai-for-humans-making-artificial-intelligence-fun-practical/id1682409647" target="_blank" rel="noopener noreferrer">Apple Podcasts</a></li>
            <li><a href="https://open.spotify.com/show/5FId0qPP5SldltQTgVFTxq?si=15bcf12a853f48f7" target="_blank" rel="noopener noreferrer">Spotify</a></li>
            <li><a href="https://aiforhumans.show" target="_blank" rel="noopener noreferrer">aiforhumans.show</a></li>
          </ul>
          <form className="newsletter" onSubmit={subscribe}>
            <label htmlFor="aifh-email">The weekly newsletter</label>
            <div className="newsletter-row">
              <input
                id="aifh-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn">Subscribe</button>
            </div>
            <a href="https://aiforhumans.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="newsletter-archive">
              Read past issues
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Writing() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    fetchPosts(1, 4)
      .then((data) => setPosts((data.posts || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  if (!posts.length) return null;

  return (
    <section id="latest-post" className="section-block writing">
      <div className="block-head">
        <h2 className="block-title">Writing</h2>
        <p className="block-note">Field notes on new models and tools. <Link to="/blog">All posts</Link></p>
      </div>
      <ul className="post-list" onMouseLeave={() => setActive(null)}>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              onMouseEnter={(e) => {
                setPoint({ x: e.clientX, y: e.clientY });
                if (p.featuredImage) setActive({ id: p.slug, image: p.featuredImage, aspect: 0.667 });
              }}
              onMouseMove={(e) => setPoint({ x: e.clientX, y: e.clientY })}
            >
              <time dateTime={p.date}>
                {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="post-title">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {canHover && <DitherPreview item={active} point={point} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */

const offers = [
  {
    kind: 'Workshop',
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
    kind: 'Ongoing advisory',
    title: 'Fractional Creative Technologist',
    description:
      'Senior AI leadership for your creative org without the full-time hire. Usually three to six months of recurring working sessions where we ship real workflows, not decks. A few teams at a time.',
    includes: [
      'Monthly strategy and roadmap sessions',
      'Tool and vendor evaluation',
      'Team upskilling plan',
      'Direct line to me between sessions',
    ],
  },
  {
    kind: 'On stage',
    title: 'Keynotes and speaking',
    description: 'Two decades of TV plus daily hands-on AI, on your stage. Funny, practical, zero hype.',
    includes: [
      'AI for Actual Humans: What’s Real, What’s Hype, and What to Do About It',
      'The AI-Native Studio: How Creative Teams Will Work in 2027',
      'Custom talks built for your audience',
    ],
  },
];

export function Consulting() {
  return (
    <section id="consulting" className="section-block consulting">
      <h2 className="consult-title">Your AI strategy needs a showrunner.</h2>
      <p className="consult-sub">
        I work with media companies, entertainment brands, and creative teams that know AI
        matters and want someone who has actually shipped with it. Three ways in.
      </p>
      <div className="offers">
        {offers.map((o) => (
          <article key={o.title} className="offer">
            <p className="offer-kind">{o.kind}</p>
            <h3 className="offer-title">{o.title}</h3>
            <p className="offer-desc">{o.description}</p>
            <ul className="offer-list">
              {o.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="faq-wrap">
        <FAQ />
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-intro">
          <h2 className="contact-title">Tell me what you're working on.</h2>
          <p>
            A few sentences is plenty. The budget question just helps me point you at the
            right offer.
          </p>
          <a className="contact-email" href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a>
        </div>
        <IntakeForm />
      </div>
    </section>
  );
}
