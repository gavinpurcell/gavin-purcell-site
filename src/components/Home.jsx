import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import About from './About';
import AIForHumans from './AIForHumans';
import KingOfThePrompts from './KingOfThePrompts';
import FigMoss from './FigMoss';
import Fishbowl from './Fishbowl';
import AndThen from './AndThen';
import FeaturedBlogPost from './FeaturedBlogPost';
import Consulting from './Consulting';

function Home() {
  return (
    <main id="main">
      <Helmet>
        <title>Gavin Purcell | Creative Technologist, AI Speaker for Media & Entertainment</title>
        <link rel="canonical" href="https://gavinpurcell.com/" />
      </Helmet>
      <Hero />
      <About />
      <AIForHumans />
      <KingOfThePrompts />
      <FigMoss />
      <Fishbowl />
      <AndThen />
      <FeaturedBlogPost />
      <Consulting />
    </main>
  );
}

export default Home;
