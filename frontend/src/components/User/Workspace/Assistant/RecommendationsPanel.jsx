import { Zap, Users, Lightbulb } from 'lucide-react';

export default function RecommendationsPanel() {
  const recommendations = [
    {
      type: 'flow',
      title: 'Flow Alert',
      description: 'Reallocate "API Review" to Tuesday\'s Peak.',
      stat: 'Saves 40 mins',
      actionText: 'View',
      icon: Zap,
      colorClass: 'text-[#EF2F29]',
      bgGlow: 'bg-[#EF2F29]/5 hover:bg-[#EF2F29]/10',
      borderColor: 'hover:border-[#EF2F29]/30'
    },
    {
      type: 'meeting',
      title: 'Meeting Insight',
      description: 'Shorten stand-up based on last 4 sessions.',
      stat: 'Increases Focus',
      actionText: 'Apply',
      icon: Users,
      colorClass: 'text-[#ff6b66]',
      bgGlow: 'bg-[#ff6b66]/5 hover:bg-[#ff6b66]/10',
      borderColor: 'hover:border-[#ff6b66]/30'
    }
  ];

  return (
    <section className="w-full lg:w-[22%] p-4 border-l border-white/5 flex flex-col gap-6 overflow-y-auto z-10 relative">
      
      {/* Title */}
      <div>
        <h3 className="font-mono text-[10px] font-bold text-[#c7c4d7]/60 mb-4 tracking-widest uppercase">
          AI Recommendations
        </h3>
        <div className="flex flex-col gap-4">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div 
                key={idx}
                className={`glass-card rounded-2xl p-4 relative overflow-hidden group ${rec.bgGlow} ${rec.borderColor} border border-white/5 transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${rec.colorClass} animate-pulse`} />
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${rec.colorClass}`}>
                    {rec.title}
                  </span>
                </div>
                <p className="font-sans text-xs font-semibold text-white leading-tight mb-3">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#c7c4d7]/60 font-medium">
                    {rec.stat}
                  </span>
                  <button 
                    className={`text-xs font-bold ${rec.colorClass} hover:underline cursor-pointer`}
                    onClick={() => alert(`Applying recommendation: "${rec.title}"`)}
                  >
                    {rec.actionText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network visualization block */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-md shadow-black/20">
        <div className="h-28 overflow-hidden relative">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98cnFtlMINs3sJbiRykmfbyXxnTfmx7BYHXM_KM7Ab4fuPsR-TJBfqPBWSvTr4hlVQZh-rg2LOvRaD1rd7BtY1YPSdr-00xvPE4lhyPPoZ97FFNJxk6tdxg55jv6bwrN8HRZlZ4AQCgfBxVT0-lbkBNdQqWKA7z7n2escFJ3gFCR3S5DtEIEjARE1pY2Ww2XGijbj07nzSAo5irkuq8I-2YQm5YHBKCZz22J6UhjVXoYGPcI2iUFTq-oY6Nt9jrj5EUbXuTLo8w" 
            alt="AI network visualization mapping" 
            className="w-full h-full object-cover opacity-60 hover:opacity-85 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="p-3 bg-[#030303]/45">
          <p className="text-[9px] font-mono text-[#4cd7f6] uppercase tracking-wider font-extrabold">
            NETWORK_STATUS: OPTIMIZED
          </p>
        </div>
      </div>

      {/* Helper tips at bottom */}
      <div className="mt-auto pt-2">
        <div className="p-4 bg-[#5c0402]/10 border border-[#ffa8a5]/20 rounded-2xl flex flex-col gap-2">
          <p className="text-xs text-[#ffa8a5] font-bold flex items-center gap-1.5 leading-none">
            <Lightbulb className="w-4 h-4 animate-bounce shrink-0" />
            Pro Tip
          </p>
          <p className="text-[10px] text-[#c7c4d7] leading-relaxed font-sans font-medium">
            Use natural language to ask me to "Clear my Thursday afternoon" and I'll reschedule everything automatically.
          </p>
        </div>
      </div>

    </section>
  );
}
