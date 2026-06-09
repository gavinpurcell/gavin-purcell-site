import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import About from './About';
import AIForHumans from './AIForHumans';
import Fishbowl from './Fishbowl';
import AndThen from './AndThen';
import FeaturedBlogPost from './FeaturedBlogPost';
import Consulting from './Consulting';

function Home() {
  return (
    <main id="main">
      <Helmet>
        <title>Gavin Purcell - Emmy-Winning Media Executive, AI Expert & Consultant | Tonight Show Showrunner</title>
        <link rel="canonical" href="https://gavinpurcell.com/" />
      </Helmet>
      <Hero />
      <About />
      <AIForHumans />
      <Fishbowl />
      <AndThen />
      <FeaturedBlogPost />
      <Consulting />
    </main>
  );
}

export default Home;
