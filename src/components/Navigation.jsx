import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const navLinks = [
  { href: '/about', label: 'About', hash: false },
  { href: '/work', label: 'Work', hash: false },
  { href: '#aifh', label: 'AI For Humans', hash: true },
  { href: '/blog', label: 'Writing', hash: false },
  { href: '#contact', label: 'Get in touch', cta: true, hash: true },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Over the blue hero the nav is white type on nothing; past it, blue on paper.
  useEffect(() => {
    if (!isHomePage) return undefined;
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleHashNavigation = (e, href) => {
    e.preventDefault();
    closeMobileMenu();
    const go = () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    if (!isHomePage) {
      navigate('/');
      setTimeout(go, 150);
    } else {
      go();
    }
  };

  const renderLink = (link, className) =>
    link.hash ? (
      <a key={link.href} href={`/${link.href}`} onClick={(e) => handleHashNavigation(e, link.href)} className={className}>
        {link.label}
      </a>
    ) : (
      <Link key={link.href} to={link.href} onClick={closeMobileMenu} className={className}>
        {link.label}
      </Link>
    );

  const onBlue = isHomePage && overHero && !mobileMenuOpen;

  return (
    <nav className={`nav ${onBlue ? 'nav-on-blue' : 'nav-on-paper'} ${mobileMenuOpen ? 'nav-open' : ''}`}>
      <div className="nav-container">
        <a href="/" onClick={handleLogoClick} className="nav-logo">
          Gavin Purcell
        </a>

        <div className="nav-links nav-links-desktop">
          {navLinks.map((link) => renderLink(link, `nav-link ${link.cta ? 'nav-link-cta' : ''}`))}
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile" id="mobile-menu">
          {navLinks.map((link) => renderLink(link, 'nav-mobile-link'))}
        </div>
      )}
    </nav>
  );
}
