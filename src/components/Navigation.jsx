import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#about', label: 'About', hash: true },
    { href: '#aifh', label: 'AI For Humans', hash: true },
    { href: '#andthen', label: 'AndThen', hash: true },
    { href: '/blog', label: 'Blog', hash: false },
    { href: '#consulting', label: 'Work With Me', hash: true },
    { href: '#contact', label: 'Get In Touch', cta: true, hash: true }
  ];

  return (
    <motion.nav
      className="nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo-link">
          <motion.div
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="nav-logo-name">Gavin Purcell</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links nav-links-desktop">
          {navLinks.map((link) => (
            link.hash ? (
              <a
                key={link.href}
                href={isHomePage ? link.href : `/${link.href}`}
                className={`nav-link ${link.cta ? 'nav-link-cta' : ''}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link ${link.cta ? 'nav-link-cta' : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="nav-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="nav-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className="nav-mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="nav-mobile-header">
                <span className="nav-mobile-title">Menu</span>
                <button
                  className="nav-mobile-close"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="nav-mobile-links">
                {navLinks.map((link, index) => (
                  link.hash ? (
                    <motion.a
                      key={link.href}
                      href={isHomePage ? link.href : `/${link.href}`}
                      className={`nav-mobile-link ${link.cta ? 'nav-mobile-link-cta' : ''}`}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`nav-mobile-link ${link.cta ? 'nav-mobile-link-cta' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
