import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EtymologySection from './components/EtymologySection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <div
        className="overflow-x-hidden bg-black"
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in',
        }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <EtymologySection />
        <Footer />
      </div>
    </>
  );
}
