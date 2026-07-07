import { useEffect, useState, useRef } from 'react';
import { Play, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import toast  from 'react-hot-toast';

export default function Hero() {
  const heroRef = useRef(null);

  const [userCount, setUserCount] = useState(0);

  useEffect(()=>{
    const fetchUserCount = async () => {
      try{
        const res = await api.get("user/count");
        setUserCount(res.data.totalUsers);
      }catch(error){
        console.error("Error fetching user count:", error);
        toast.error("Failed to load user count");
      }
    };
    fetchUserCount();
  }, []);

  const [hovered, setHovered] = useState(false);

  return (
    <section 
      ref={heroRef}
      className="relative max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >

      {/* Hero Left Content */}
      <div className="flex flex-col gap-8 reveal active">
        
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card w-fit border-white/15 shadow-[0_0_20px_rgba(76,215,246,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="font-mono text-xs font-semibold text-tertiary uppercase tracking-widest">
            Next-Gen AI is Live
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-white select-none">
          Manage Work <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF2F29] via-[#FF5F5F] to-[#8B0000] drop-shadow-[0_0_20px_rgba(239, 47, 41, 0.2)]">
            Smarter with AI
          </span>
        </h1>

        {/* Body Copy */}
        <p className="font-sans text-lg text-on-surface-variant max-w-xl leading-relaxed">
          Taskify isn't just a project management tool. It's a high-fidelity cognitive engine that predicts bottlenecks, automates deep-work schedules, and synthesizes team data into actionable velocity.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="register" className="relative group px-8 py-4 rounded-xl font-sans font-bold text-sm text-white-always bg-[#EF2F29] shadow-xl shadow-[#EF2F29]/20 transition-all duration-300 hover:scale-105 active:scale-95">
            Get Started for Free
            <span className="absolute bottom-0 left-0 w-full h-0 bg-[rgba(255,255,255,0.2)] transition-all duration-300 group-hover:h-full rounded-xl"></span>
          </Link>
          
          <button className="glass-card px-8 py-4 rounded-xl flex items-center gap-2 font-sans font-bold text-sm text-white hover:bg-white/10 border-white/10 hover:border-white/25 transition-all duration-300 active:scale-95">
            <Play className="w-4 h-4 text-[#EF2F29] fill-[#EF2F29]" />
            Watch Demo
          </button>
        </div>

        {/* Quick Trust Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-lg mt-4">
          <div>
            <div className="font-display font-extrabold text-2xl text-white">99.8%</div>
            <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">AI Velocity Suggestion</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-white">42%</div>
            <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Efficiency Lift</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-white">{ userCount }</div>
            <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Users Joined</div>
          </div>
        </div>

      </div>

      {/* Hero Right 3D Interactive Card */}
      <div className="relative flex items-center justify-center py-10 lg:py-0">
        
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#EF2F29]/10 via-[#EF2F29]/5 to-transparent blur-3xl rounded-full scale-75 animate-pulse" />

        {/* 3D Dashboard Mockup */}
        <div 
          className={`relative glass-card p-3 rounded-[2.2rem] border-white/15 overflow-visible aspect-square w-full max-w-[460px] flex items-center justify-center transition-shadow duration-500 group ${
            hovered 
              ? 'shadow-[0_40px_80px_rgba(239, 47, 41, 0.18)] border-primary/20' 
              : 'shadow-[0_30px_60px_rgba(0,0,0,0.6)]'
          }`}
          style={{
            transform: `perspective(2000px) rotateY(-15deg) rotateX(10deg) ${hovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'}`,
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s, box-shadow 0.5s'
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Card Image */}
          <div className="relative rounded-2xl w-full h-full overflow-hidden border border-white/10 bg-[#000000]">
            <img 
              alt="Futuristic Platform Interface" 
              className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYEQhqU-Iw537zNzTGsASdb9uRIQ8k-Wv0o_9cO_j_id2VMMpwkoAaMz0SbmjKC6E9yKlHLO5r9PNxs2PEYBwawRGMrOqkum7fRkFfqtPH-b9edcFerCxdF21eTLA7Upsbdo8Hq69E9hMFF08FZ8r73NGYq9frRQTb4XDvbaJvA10xs0jVqHUqI2xsH7d0jXidj_rKql8XT-StE7-2MRGsVCUkQkB39ZSrnXAQ_3KWc_84zhYaj0y7s0eOVTFaK66c7fxX--32Tw"
            />
            {/* Ambient neon gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Element 1: AI Suggestion */}
          <div className="floating-element absolute top-10 -left-12 glass-card px-5 py-4 rounded-2xl border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2 pointer-events-none select-none z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-tertiary/15 flex items-center justify-center border border-tertiary/20">
                <Sparkles className="w-3.5 h-3.5 text-tertiary" />
              </div>
              <span className="font-sans font-bold text-xs text-white">AI Suggestion</span>
            </div>
            <div className="text-[10px] text-on-surface-variant font-sans">Aether Testing overlap detected</div>
            <div className="h-1.5 w-28 bg-white/10 rounded-full overflow-hidden mt-1 relative">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-tertiary to-primary w-[75%] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Floating Element 2: Assigned Notification */}
          <div className="floating-element-delay-1 absolute bottom-16 -right-8 glass-card px-5 py-3.5 rounded-2xl border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 pointer-events-none select-none z-10">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-sans font-bold text-xs text-white">Project Assigned</div>
              <div className="text-[9px] text-on-surface-variant font-mono mt-0.5 uppercase tracking-wider">Aether Hub · 2m ago</div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
