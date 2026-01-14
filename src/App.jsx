import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import AIForHumans from './components/AIForHumans';
import AndThen from './components/AndThen';
import Consulting from './components/Consulting';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <AIForHumans />
        <AndThen />
        <Consulting />
      </main>
      <Footer />
    </div>
  );
}

export default App;
