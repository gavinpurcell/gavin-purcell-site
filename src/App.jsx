import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </MotionConfig>
  );
}

export default App;
