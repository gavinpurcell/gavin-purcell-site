import { Link } from 'react-router-dom';
import './Footer.css';

const columns = [
  {
    title: 'Site',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Work', to: '/work' },
      { label: 'Writing', to: '/blog' },
      { label: 'Work with me', href: '/#consulting' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'King of the Prompts', href: 'https://kingoftheprompts.com' },
      { label: 'Fig & Moss', href: 'https://figandmoss.tv' },
      { label: 'The Fishbowl', href: 'https://fishbowl.show' },
      { label: 'Fishbowl on GitHub', href: 'https://github.com/gavinpurcell/the-fishbowl' },
      { label: 'AndThen', href: 'https://andthen.chat' },
      { label: 'AndThen partnerships', href: 'mailto:partnerships@andthen.chat' },
    ],
  },
  {
    title: 'AI For Humans',
    links: [
      { label: 'The show', href: 'https://aiforhumans.show' },
      { label: 'YouTube', href: 'https://www.youtube.com/@AIForHumansShow' },
      { label: 'Newsletter', href: 'https://aiforhumans.beehiiv.com/' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'X', href: 'https://x.com/gavinpurcell' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gavin-purcell/' },
      { label: 'Email', href: 'mailto:gavin@gavinpurcell.com' },
    ],
  },
];

function FooterLink({ link }) {
  if (link.to) return <Link to={link.to}>{link.label}</Link>;
  const external = link.href.startsWith('http');
  return (
    <a href={link.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {link.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-grid" aria-label="Footer">
        {columns.map((col) => (
          <div key={col.title} className="footer-col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} Gavin Purcell. Creative technologist, Emmy-winning showrunner.</p>
        <Link to="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
