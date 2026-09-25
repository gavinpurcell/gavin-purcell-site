import { Helmet } from 'react-helmet-async';
import DiffusionHero from './signal/DiffusionHero';
import WorkIndex from './signal/WorkIndex';
import { AIForHumansBlock, Consulting, Contact, Intro, Writing } from './signal/Sections';
import './signal/signal.css';

// The homepage is Gavin's profile page; the Person and WebSite nodes it
// points at are defined once in index.html.
const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://gavinpurcell.com/#profile',
  url: 'https://gavinpurcell.com/',
  name: 'Gavin Purcell | Creative Technologist',
  isPartOf: { '@id': 'https://gavinpurcell.com/#website' },
  mainEntity: { '@id': 'https://gavinpurcell.com/#person' },
  dateModified: '2026-09-25',
};

function Home() {
  return (
    <main id="main">
      <Helmet>
        <title>Gavin Purcell | Creative Technologist, AI Speaker for Media & Entertainment</title>
        <link rel="canonical" href="https://gavinpurcell.com/" />
        <script type="application/ld+json">{JSON.stringify(profileSchema)}</script>
      </Helmet>
      <DiffusionHero />
      <Intro />
      <WorkIndex />
      <AIForHumansBlock />
      <Writing />
      <Consulting />
      <Contact />
    </main>
  );
}

export default Home;
