import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router does not reset scroll position on navigation. Without this,
// clicking a nav Link while scrolled down on one page lands you at the same
// scroll offset on the next page instead of the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // The site sets `html { scroll-behavior: smooth }` globally for in-page
    // anchor jumps. Without an explicit "instant" here, a route change
    // inherits that and the reset either animates or silently no-ops
    // depending on the browser, instead of landing at the top immediately.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
