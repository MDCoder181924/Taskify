import { useEffect, useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react'; 
import {Link} from 'react-router-dom';
import { gsap } from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const tl = gsap.timeline();
  tl.fromTo("#TaskifayGsap",{
      y: -100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay:2,
      ease: "power3.out"
    }
  )
  .fromTo(".HeaderSection",{
      y: -100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration:0.6,
      stagger: 0.08,
      ease: "power3.out"
    }
  )
  .fromTo(".logingsap",{
    y:-100,
    opacity:0
  },{
    y:0,
    duration:0.5,
    opacity:1,
    delay:1,
    ease: "power3.out"
  })
  .fromTo(".startgsap",{
    y:-100,
    opacity:0
  },{
    y:0,
    duration:0.5,
    opacity:1,
    ease: "power3.out"
  });

}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'h-16 bg-[#0b1326]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' 
          : 'h-20 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div id="TaskifayGsap" className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-9 h-9 rounded-lg bg-surface flex items-center justify-center border border-white/10">
              <Cpu className="w-5 h-5 text-tertiary" />
            </div>
          </div>
          <span  className="font-display font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary select-none">
            Taskify
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Solutions', 'Pricing', 'About'].map((link, idx) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className={`HeaderSection font-sans font-medium text-sm transition-all duration-300 relative py-1 hover:text-white ${
                idx === 0 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface-variant hover:scale-105'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="logingsap font-sans font-medium text-sm text-on-surface-variant hover:text-white transition-colors duration-300">
            Login
          </Link>
          
          <Link to="register" className="startgsap relative group overflow-hidden px-5 py-2 rounded-full font-sans font-bold text-sm text-white shadow-[0_0_20px_rgba(73,75,214,0.3)] transition-transform duration-300 hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-inverse-primary to-secondary-container"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-white/20 transition-all duration-300 group-hover:h-full"></span>
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-screen w-72 z-40 bg-surface-lowest/95 backdrop-blur-2xl border-l border-white/10 p-8 shadow-2xl transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-8">
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 mb-12">
          {['Home', 'Features', 'Solutions', 'Pricing', 'About'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className=" font-sans font-semibold text-lg text-on-surface hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <Link to="/login" className="w-full py-3 rounded-xl border border-white/10 font-bold text-on-surface hover:bg-white/5 transition-colors">
            Login
          </Link>
          
          <Link to="/register" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold shadow-lg shadow-primary/20">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
