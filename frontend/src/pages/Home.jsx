import { useEffect, useState } from 'react';
import Navbar from '../components/Home/Navbar';
import ThreeBackground from  '../components/Home/ThreeBackground';
import LoadingScreen from '../components/Common/LoadingScreen';
import Hero from '../components/Home/Hero';
import BentoFeatures from '../components/Home/BentoFeatures';
import SpatialUniverse from '../components/Home/SpatialUniverse';
import AgentSimulator from '../components/Home/AgentSimulator';
import Pricing from '../components/Home/Pricing';
import Footer from '../components/Home/Footer';

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleLoad = () => {
      setFadeLoader(true);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    };

    if (document.readyState === 'complete') {
      const timer = setTimeout(handleLoad, 300);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleLoad);
      const fallbackTimer = setTimeout(handleLoad, 4000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  useEffect(() => {
    
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => revealObserver.observe(el));

    return () => {
      elementsToReveal.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <>
      
      {loading && (
        <div 
          className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
            fadeLoader ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
          }`}
        >
          <LoadingScreen />
        </div>
      )}

      <div className="noise-overlay" />
      <ThreeBackground />
      <Navbar />
      <main className="relative">
        <div id="home">
          <Hero />
        </div>
        <BentoFeatures />
        <SpatialUniverse />
        <AgentSimulator />
        <Pricing />

      </main>

      <Footer />
    </>
  );
}

export default Home;
