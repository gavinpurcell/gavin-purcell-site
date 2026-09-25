import { useState } from 'react';
import DitherPreview from './DitherPreview';

const work = [
  {
    id: 'kingoftheprompts',
    name: 'King of the Prompts',
    kind: 'Live game show',
    line: 'Two players get thirty seconds to write a video prompt, AI films both, and the crowd votes. Spec to live domain in five days.',
    href: 'https://kingoftheprompts.com',
    image: '/kotp-screenshot.jpg',
    alt: 'A finished King of the Prompts match: two AI films side by side and a card reading You won. Defend your crown.',
  },
  {
    id: 'figmoss',
    name: 'Fig & Moss',
    kind: 'Animated universe',
    line: 'Seven shows written, built, scored, and rendered by the AI I work with every day. Thirty-one pieces and counting.',
    href: 'https://figandmoss.tv',
    image: '/figmoss-screenshot.jpg',
    alt: 'Fig, a figure with a gold fig-leaf head, and Moss, a green tardigrade, on a couch facing a TV.',
  },
  {
    id: 'fishbowl',
    name: 'The Fishbowl',
    kind: 'AI focus group',
    line: 'Drop in an idea and four AI experts debate it live in a pixel-art roundtable. Free and open source.',
    href: 'https://fishbowl.show',
    image: '/fishbowl-screenshot.jpg',
    alt: 'Four pixel-art AI panelists debating an idea around a roundtable.',
  },
  {
    id: 'andthen',
    name: 'AndThen',
    kind: 'Co-founder',
    line: 'Interactive audio where you steer human-crafted stories with your voice while AI characters talk back. Backed by a16z Speedrun.',
    href: 'https://andthen.chat',
    image: '/andthen-logo.png',
    alt: 'The AndThen logo.',
  },
];

export default function WorkIndex() {
  const [active, setActive] = useState(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  return (
    <section id="rundown" className="section-block work">
      <div className="block-head">
        <h2 className="block-title">Selected work</h2>
        <p className="block-note">Things I've built lately, all of them live. More on the <a href="/work">work page</a>.</p>
      </div>
      <ul className="work-list" onMouseLeave={() => setActive(null)}>
        {work.map((w) => {
          const external = w.href.startsWith('http');
          return (
            <li key={w.id} id={w.id} className="work-row">
              <a
                href={w.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={(e) => {
                  setPoint({ x: e.clientX, y: e.clientY });
                  setActive(w);
                }}
                onMouseMove={(e) => setPoint({ x: e.clientX, y: e.clientY })}
                onFocus={() => setActive(null)}
              >
                <span className="work-name">{w.name}</span>
                <span className="work-meta">
                  <span className="work-kind">{w.kind}</span>
                  <span className="work-line">{w.line}</span>
                </span>
                <img className="work-thumb" src={w.image} alt={w.alt} loading="lazy" />
              </a>
            </li>
          );
        })}
      </ul>
      {canHover && <DitherPreview item={active} point={point} />}
    </section>
  );
}
