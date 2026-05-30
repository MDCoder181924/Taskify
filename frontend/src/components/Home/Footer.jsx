import { Send, Globe, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#000000]/60 backdrop-blur-3xl z-10 overflow-hidden">
      
      {/* Light leak glow */}
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-[-1]" />

      {/* Call To Action Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        
        <div className="reveal reveal-fade-up glass-card p-8 md:p-16 rounded-[3.5rem] border-white/10 relative overflow-hidden bg-gradient-to-br from-surface-low/80 to-surface-highest/80 mb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,47,41,0.06),transparent_70%)]" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <h2 className="font-display font-extrabold text-3.5xl md:text-5xl text-white tracking-tight leading-tight">
              Start Your Productivity Revolution Today
            </h2>
            <p className="text-on-surface-variant font-sans text-base md:text-lg max-w-xl">
              Join 50,000+ high-velocity teams engineering their future with Taskify AI.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-2">
              <input 
                type="email" 
                placeholder="Enter your work email"
                className="flex-1 bg-surface-high/60 border border-white/10 rounded-xl px-5 py-4 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/40"
                required
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary text-[#050505] px-8 py-4 rounded-xl font-sans font-bold text-sm hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-primary/10 whitespace-nowrap"
              >
                Claim My Access
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Directory */}
        <div className="reveal reveal-fade-up grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <span className="font-display font-extrabold text-2xl text-white select-none">
              Taskify
            </span>
            <p className="text-on-surface-variant font-sans text-sm max-w-sm leading-relaxed">
              Engineering the edge of tomorrow through advanced project and spatial task intelligence.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {['language', 'alternate_email', 'terminal'].map((ico, idx) => (
                <a 
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-on-surface-variant hover:text-primary border-white/5 hover:border-white/15"
                >
                  <Globe className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4 text-sm font-sans text-on-surface-variant">
              {['AI Engine', 'Automations', 'Integrations', 'API Docs'].map((lnk) => (
                <li key={lnk}>
                  <a href="#" className="hover:text-primary transition-colors">{lnk}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm font-sans text-on-surface-variant">
              {['About Us', 'Careers', 'Engineering Blog', 'Media Kit'].map((lnk) => (
                <li key={lnk}>
                  <a href="#" className="hover:text-primary transition-colors">{lnk}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm font-sans text-on-surface-variant">
              {['Privacy Policy', 'Terms of Service', 'Security Shield', 'Uptime Status'].map((lnk) => (
                <li key={lnk}>
                  <a href="#" className="hover:text-primary transition-colors">{lnk}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright & Meta */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-on-surface-variant/60">
          <span>© 2026 Taskify AI Inc. All rights reserved. Engineering the edge of tomorrow.</span>
          
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">
              System Status: Optimal
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
