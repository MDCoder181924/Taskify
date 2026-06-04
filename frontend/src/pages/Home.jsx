import { useEffect, useState } from 'react';
import Navbar from '../components/Home/Navbar';
import ThreeBackground from  '../components/Home/ThreeBackground';
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

    const timer = setTimeout(() => {
      setFadeLoader(true);
      setTimeout(() => {
        setLoading(false);
      }, 700); 
    }, 1000);

    return () => clearTimeout(timer);
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
          className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
            fadeLoader ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
          }`}
        >
          
          <div className="absolute top-[30%] left-[20%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-[30%] right-[20%] w-72 h-72 rounded-full bg-secondary/10 blur-[100px] animate-pulse" />

          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-tertiary animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-[3px] rounded-2xl bg-[#050505] flex items-center justify-center">
                <svg className="w-8 h-8 text-tertiary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#ffa940" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 mt-2">
              <span className="font-display font-extrabold text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary drop-shadow-[0_0_15px_rgba(192,193,255,0.35)]">
                Taskify AI
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant/60 uppercase tracking-widest">
                Engineering the Edge of Tomorrow
              </span>
            </div>

            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-6 relative border border-white/5">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-tertiary via-primary to-secondary w-full rounded-full animate-loader-progress" />
            </div>
          </div>
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
