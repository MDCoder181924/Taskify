import { Brain, Calendar, Users, ShieldAlert, Sparkles, Command, ShieldCheck } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      
      {/* Header */}
      <div className="text-center mb-16 reveal reveal-fade-up">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Redefining Platform <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Productivity & Control
          </span>
        </h2>
        <p className="text-on-surface-variant font-sans text-lg max-w-2xl mx-auto leading-relaxed">
          Engineered with precision for elite engineering teams that demand the absolute peak of operational efficiency.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: AI Task Suggestions (Col-span 2) */}
        <div className="glass-card p-8 md:p-10 rounded-[2rem] md:col-span-2 relative overflow-hidden group reveal reveal-fade-up">
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white mb-4">
                AI Task Suggestions
              </h3>
              <p className="text-on-surface-variant font-sans text-sm md:text-base max-w-lg leading-relaxed">
                Our neural engine analyzes your project history to predict next steps before you even think of them. Automated priority shifting ensures you're always working on what matters.
              </p>
            </div>

            {/* Glowing active stats */}
            <div className="flex gap-4 mt-8">
              <div className="glass-card px-4 py-2.5 rounded-xl border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">Priority shift</span>
                <span className="text-sm font-bold text-white font-mono">Instantaneous</span>
              </div>
              <div className="glass-card px-4 py-2.5 rounded-xl border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">Accuracy lift</span>
                <span className="text-sm font-bold text-primary font-mono">+94.6%</span>
              </div>
            </div>
          </div>

          {/* Futuristic Animated Neural SVG Overlay */}
          <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c0c1ff" />
                  <stop offset="100%" stopColor="#fbabff" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="70" fill="none" stroke="url(#gridGrad)" strokeWidth="0.5" strokeDasharray="3, 3" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="url(#gridGrad)" strokeWidth="0.3" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="url(#gridGrad)" strokeWidth="0.2" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="url(#gridGrad)" strokeWidth="0.2" />
              <path d="M 50,50 L 150,150" stroke="url(#gridGrad)" strokeWidth="0.2" />
              <path d="M 150,50 L 50,150" stroke="url(#gridGrad)" strokeWidth="0.2" />
              {/* Floating pulsing stars */}
              <circle cx="100" cy="30" r="2" fill="#c0c1ff" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="150" cy="50" r="1.5" fill="#fbabff" />
              <circle cx="50" cy="150" r="2.5" fill="#4cd7f6" />
            </svg>
          </div>
        </div>

        {/* Card 2: Smart Scheduling (Col-span 1) */}
        <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between reveal reveal-fade-up">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-4">
              Smart Scheduling
            </h3>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
              Dynamic calendar optimization that finds high-fidelity 'Deep Work' slots across your entire team's availability automatically, reducing schedule fragmentation.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex -space-x-3 items-center">
              {['#8083ff', '#ae05c6', '#009eb9'].map((col, idx) => (
                <div 
                  key={idx}
                  className="w-9 h-9 rounded-full border-2 border-[#0b1326] flex items-center justify-center text-white text-[10px] font-bold shadow-md"
                  style={{ backgroundColor: col }}
                >
                  U{idx + 1}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#0b1326] bg-[#2d3449] flex items-center justify-center text-on-surface-variant text-[10px] font-bold">
                +12
              </div>
            </div>
            <div className="text-[10px] text-secondary font-mono uppercase tracking-wider">
              Optimal Overlaps Located
            </div>
          </div>
        </div>

        {/* Card 3: Team Hub */}
        <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between reveal reveal-fade-up">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-tertiary" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-4">
              Team Hub
            </h3>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
              Centralized communication threads with real-time AI-generated summaries of missed context, tasks, and crucial deliverables.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="font-mono text-xs text-white">#quantum-testing</span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[9px] font-mono font-bold uppercase">Active</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="font-mono text-xs text-white">#aether-sync</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-on-surface-variant text-[9px] font-mono font-bold uppercase">10m ago</span>
            </div>
          </div>
        </div>

        {/* Card 4: Vault-Grade Security (Col-span 2) */}
        <div className="glass-card p-8 md:p-10 rounded-[2rem] md:col-span-2 flex flex-col md:flex-row gap-8 items-center reveal reveal-fade-up">
          
          <div className="flex-1">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-4">
              Vault-Grade Security
            </h3>
            <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
              Your platform data is encrypted using advanced post-quantum cryptographic systems. We enforce absolute isolation protocols so that your team can focus exclusively on growth.
            </p>
          </div>

          <div className="flex-1 w-full bg-surface-lowest/70 rounded-2xl p-6 border border-white/5 shadow-inner flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center justify-between text-tertiary">
              <span>Security Shield</span>
              <span className="animate-pulse">Active</span>
            </div>
            <div className="space-y-2 mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-tertiary via-primary to-secondary w-full" />
              </div>
              <div className="h-2 w-5/6 bg-white/5 rounded-full" />
              <div className="h-2 w-2/3 bg-white/5 rounded-full" />
            </div>
            <div className="text-[10px] text-on-surface-variant/60 mt-4 leading-normal">
              SHA-256 Quantum Shield applied.<br/>
              Network isolation routing: Optimal.
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
