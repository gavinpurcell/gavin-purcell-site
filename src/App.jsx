import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';

// The homepage ships in the main bundle; every other page is its own chunk.
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const WorkPage = lazy(() => import('./components/WorkPage'));
const LastInventionPage = lazy(() => import('./components/LastInventionPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Navigation />
      <Suspense fallback={<div className="route-loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/the-last-invention" element={<LastInventionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
