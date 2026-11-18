import { useState } from 'react';
import { Link } from 'react-router-dom';
import DitherPlate from './DitherPlate';

// One plate each. `films` turns a plate into a series with its own links.
const work = [
  {
    id: 'imogen',
    slot: 'lead',
    name: ['Imogen', 'Ashby'],
    kind: 'AI documentary series',
    line: 'Three feature-length documentaries about AI, hosted by a presenter who doesn’t exist. A (mostly) autonomous TV series I co-created with my AI agent, Fig.',
    href: '/the-last-invention',
    video: '/loops/imogen.mp4',
    poster: '/loops/imogen.jpg',
    aspect: '21 / 9',
    focusY: 0.3,
    alt: 'Dr Imogen Ashby, the AI-generated presenter, in close-up in three of her documentaries.',
    films: [
      { title: 'The Last Invention', note: '27 min', href: '/the-last-invention' },
      { title: 'Do I Feel Anything?', note: '29 min', href: 'https://www.youtube.com/watch?v=NE84ZYfnniU' },
      { title: 'What Do You Want To Be?', note: '36 min', href: 'https://www.youtube.com/watch?v=TzT9lNPaVXI' },
    ],
  },
  {
    id: 'kingoftheprompts',
    slot: 'left',
    name: ['King of the', 'Prompts'],
    kind: 'Live game show',
    line: 'Two players get thirty seconds to write a video prompt, AI films both, and the crowd votes. Spec to live domain in five days.',
    href: 'https://kingoftheprompts.com',
    video: '/loops/kotp.mp4',
    poster: '/loops/kotp.jpg',
    aspect: '16 / 10',
    alt: 'Title cards from King of the Prompts: Tiny films, massive egos. Two players, thirty seconds.',
  },
  {
    id: 'figmoss',
    slot: 'right field',
    name: ['Fig &', 'Moss'],
    kind: 'Animated universe',
    line: 'Seven shows written, built, scored, and rendered by the AI I work with every day. Thirty-one pieces and counting.',
    href: 'https://figandmoss.tv',
    video: '/loops/figmoss.mp4',
    poster: '/loops/figmoss.jpg',
    aspect: '4 / 3',
    alt: 'Fig, a figure with a gold fig-leaf head, and Moss, a green tardigrade, on a couch.',
  },
  {
    id: 'fishbowl',
    slot: 'left',
    name: ['The', 'Fishbowl'],
    kind: 'AI focus group',
    line: 'Drop in an idea and four AI experts debate it live in a pixel-art roundtable. Free and open source.',
    href: 'https://fishbowl.show',
    image: '/fishbowl-screenshot.jpg',
    // The screenshot's own shape: cropping it cuts the speech bubble and the name tags.
    aspect: '1200 / 605',
    gamma: 1.1,
    alt: 'Four pixel-art AI panelists debating an idea around a roundtable.',
  },
  {
    id: 'andthen',
    slot: 'right',
    name: ['AndThen'],
    kind: 'Co-founder',
    line: 'Interactive audio where you steer human-crafted stories with your voice while AI characters talk back. Backed by a16z Speedrun.',
    href: 'https://andthen.chat',
    video: '/loops/andthen.mp4',
    poster: '/loops/andthen.jpg',
    aspect: '16 / 10',
    alt: 'The AndThen co-founders in black and white, from the launch trailer.',
  },
];

function Anchor({ href, children, ...rest }) {
  return href.startsWith('/') ? (
    <Link to={href} {...rest}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  );
}

function Plate({ item }) {
  const [active, setActive] = useState(false);
  return (
    <article
      id={item.id}
      className={`plate plate-${item.slot.split(' ').join(' plate-')}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Anchor href={item.href} className="plate-picture" tabIndex={-1} aria-hidden="true">
        <DitherPlate
          video={item.video}
          poster={item.poster}
          image={item.image}
          alt={item.alt}
          aspect={item.aspect}
          gamma={item.gamma}
          focusY={item.focusY}
          active={active}
        />
      </Anchor>
      <h3 className="plate-title">
        <Anchor href={item.href}>
          {item.name.map((part) => (
            <span key={part}>{part} </span>
          ))}
        </Anchor>
      </h3>
      <div className="plate-meta">
        <p className="plate-line">
          <span className="plate-kind">{item.kind}.</span> {item.line}
        </p>
        {item.films && (
          <ul className="plate-films">
            {item.films.map((film) => (
              <li key={film.title}>
                <Anchor href={film.href}>{film.title}</Anchor>
                <span>{film.note}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function WorkIndex() {
  return (
    <section id="rundown" className="work">
      <div className="block-head work-head">
        <h2 className="block-title">Selected work</h2>
        <p className="block-note">
          Real footage, redrawn live in two inks. More on the <Link to="/work">work page</Link>.
        </p>
      </div>
      <div className="plates">
        {work.map((item) => (
          <Plate key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
