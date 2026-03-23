import Hero from './Hero';
import About from './About';
import AIForHumans from './AIForHumans';
import AndThen from './AndThen';
import FeaturedBlogPost from './FeaturedBlogPost';
import Consulting from './Consulting';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <AIForHumans />
      <AndThen />
      <FeaturedBlogPost />
      <Consulting />
    </main>
  );
}

export default Home;
