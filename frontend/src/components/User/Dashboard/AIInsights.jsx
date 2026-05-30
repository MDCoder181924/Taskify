import { Sparkles, Wand2, CalendarRange, ChevronRight } from 'lucide-react';

export default function AIInsights() {
  const suggestions = [
    {
      title: 'Reschedule Overdue',
      description: '3 tasks from "Project Delta" are overdue. Move to tomorrow\'s focus session?',
      actionText: 'Execute Suggestion',
      icon: Wand2,
      colorClass: 'text-[#EF2F29] bg-[#EF2F29]/10',
      badgeClass: 'bg-[#EF2F29]/10 border-[#EF2F29]/20 text-[#EF2F29]',
      hoverGlow: 'hover:border-[#EF2F29]/40 hover:shadow-[0_0_20px_rgba(239,47,41,0.1)]'
    },
    {
      title: 'Deep Work Block',
      description: 'Your calendar is open between 2PM and 4PM. Optimal time for complex coding.',
      actionText: 'Block Calendar',
      icon: CalendarRange,
      colorClass: 'text-[#ffa940] bg-[#ffa940]/10',
      badgeClass: 'bg-[#ffa940]/10 border-[#ffa940]/20 text-[#ffa940]',
      hoverGlow: 'hover:border-[#ffa940]/40 hover:shadow-[0_0_20px_rgba(255,169,64,0.1)]'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border-[#EF2F29]/20 bg-[#EF2F29]/5 relative overflow-hidden group shadow-xl shadow-black/25">
      {/* Glow highlight */}
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#EF2F29]/10 blur-[40px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#EF2F29] animate-pulse" />
        <h3 className="text-xl font-bold font-display text-[#EF2F29] tracking-tight">AI Insights</h3>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((sug, idx) => {
          const Icon = sug.icon;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${sug.hoverGlow} transition-all duration-300 cursor-pointer group/card`}
              onClick={() => alert(`Initiating AI Action: "${sug.title}"...`)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${sug.colorClass} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover/card:text-[#ffa940] transition-colors">
                  {sug.title}
                </h4>
              </div>
              
              <p className="text-xs text-[#c7c4d7] leading-relaxed font-sans font-medium">
                {sug.description}
              </p>

              <button className="mt-3 text-xs font-bold flex items-center gap-1 transition-colors text-[#c7c4d7] group-hover/card:text-white">
                <span className="group-hover/card:underline">{sug.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
