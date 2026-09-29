import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import VideoFacade from './signal/VideoFacade';
import './signal/signal.css';
import './Page.css';

const VIDEO_ID = 'cyeTIEy2qus';
const YT = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

const chapters = [
  ['0:00', 0, 'Five questions about AI'],
  ['0:53', 53, 'What is superintelligence?'],
  ['3:45', 225, 'Can we control AI? The gorilla problem'],
  ['6:03', 363, 'Is AI coming for your job?'],
  ['11:06', 666, 'What happens when you ask AI a question?'],
  ['14:30', 870, 'The chips, money and power behind AI'],
  ['16:50', 1010, 'What if AI goes right? AlphaFold and cancer screening'],
  ['21:30', 1290, 'AI actors and deepfakes: can you trust what you see?'],
  ['27:00', 1620, 'Credits'],
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'The Last Invention',
  description:
    'A 27-minute documentary about artificial intelligence, hosted by a presenter who does not exist. A (mostly) autonomous TV show Gavin Purcell co-created with his AI agent, Fig.',
  thumbnailUrl: ['https://gavinpurcell.com/last-invention-thumb.jpg'],
  uploadDate: '2026-09-28',
  duration: 'PT27M38S',
  contentUrl: YT,
  embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
  url: 'https://gavinpurcell.com/the-last-invention',
  creator: { '@type': 'Person', name: 'Gavin Purcell', url: 'https://gavinpurcell.com' },
};

export default function LastInventionPage() {
  return (
    <main id="main" className="page">
      <Helmet>
        <title>The Last Invention: an AI Documentary Made With My AI Agent | Gavin Purcell</title>
        <meta
          name="description"
          content="The Last Invention is a 27-minute documentary about AI with a host who does not exist: a (mostly) autonomous TV show Gavin Purcell co-created with his AI agent, Fig. Made in four days with Seedance 2.5 on Runway."
        />
        <link rel="canonical" href="https://gavinpurcell.com/the-last-invention" />
        <meta property="og:title" content="The Last Invention" />
        <meta property="og:image" content="https://gavinpurcell.com/last-invention-thumb.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="page-inner">
        <span className="page-eyebrow">AI documentary · 27 minutes</span>
        <h1 className="page-title">The Last Invention</h1>
        <hr className="page-rule" />

        <p className="page-lede">
          A 27-minute documentary about artificial intelligence, hosted by a wickedly dry British
          presenter named Dr Imogen Ashby. She isn&rsquo;t real. The whole thing is a (mostly)
          autonomous TV show I co-created with my AI agent, Fig.
        </p>

        <VideoFacade videoId={VIDEO_ID} label="Play The Last Invention" frameTitle="The Last Invention" />

        <div className="page-body">
          <h2>What it is</h2>
          <p>
            Five questions everyone is asking about AI, answered by someone who would know. What
            actually is it, and what do people mean by superintelligence? Is it coming for your
            job? What happens inside the data center when you ask it something? What if it all
            goes right? And in a world of AI actors and deepfakes, can you trust anything it tells
            you? It started as five short films and became one long cut with a cold open, a host,
            and a point of view.
          </p>

          <h2>How it got made</h2>
          <p>
            <strong>Fig</strong> is the AI agent I work with every day (it runs on Claude Opus
            5.5). Fig wrote the scripts, designed the host, directed every shot by prompt, checked
            every line by ear with two speech-recognition passes, cut the film in code, and built
            the graphics and the credits. Every shot, every performance, and every word of
            Imogen&rsquo;s voice was generated with <strong>Seedance 2.5 on Runway</strong>. The
            score is Lyria 3, the stills and set references are Nano Banana Pro, and the graphics
            are HyperFrames. It took four days, Thursday evening to Sunday night.
          </p>

          <h2>What &ldquo;mostly autonomous&rdquo; means</h2>
          <p>
            My job was the one I did for twenty years: showrunner. I wrote the brief, watched every
            cut, and gave notes. Imogen needed a lot more personality. Two close-ups were
            ping-ponging. A word was mispronounced. Fig did the making, I did the deciding, and
            the gap between those two jobs is the most interesting thing I learned. The tools can
            make almost anything now. Knowing what&rsquo;s good is still the work.
          </p>

          <h2>Chapters</h2>
          <ul>
            {chapters.map(([stamp, secs, name]) => (
              <li key={stamp}>
                <a href={`${YT}&t=${secs}s`} target="_blank" rel="noopener noreferrer">
                  {stamp}
                </a>{' '}
                {name}
              </li>
            ))}
          </ul>

          <h2>The lesson</h2>
          <p>
            Consistency is the whole game. One believable host across 137 lines and four days of
            generation is what makes it read as television instead of a demo.
          </p>

          <p>
            <a href={YT} target="_blank" rel="noopener noreferrer" className="page-cta">
              Watch on YouTube →
            </a>
          </p>
          <p className="page-meta">
            Imogen Ashby is fictional. Every frame of her, every word she says, and every note of
            music in the film was generated. More projects on the <Link to="/work">work page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
