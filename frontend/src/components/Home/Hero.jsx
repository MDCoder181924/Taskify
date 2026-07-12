import { useEffect, useState, useRef } from 'react';
import { Play } from 'lucide-react';
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

  return (
    <section 
      ref={heroRef}
      className="relative max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-20 flex flex-col items-center text-center gap-8"
    >

      {/* Hero Left Content */}
      <div className="flex flex-col items-center gap-8 reveal active">
        
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
        <div className="flex flex-wrap justify-center gap-4 pt-4">
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
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 w-full max-w-lg mt-4 justify-items-center">
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

    </section>
  );
}
