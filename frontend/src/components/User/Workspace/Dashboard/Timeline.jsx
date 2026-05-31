export default function Timeline() {
  const events = [
    {
      title: 'High Momentum Phase',
      time: '09:00 AM — 11:30 AM',
      description: 'Cleared 8 high-priority tickets. Focused work session detected. AI Assistant handled 12 incoming requests.',
      colorClass: 'bg-[#EF2F29]',
      shadowClass: 'shadow-[0_0_15px_rgba(239,47,41,0.48)]',
      line: true
    },
    {
      title: 'Strategic Planning',
      time: '02:00 PM — 03:30 PM',
      description: 'Team sync for Project Quantum. 4 new milestones added to the roadmap. Velocity remains stable.',
      colorClass: 'bg-[#ff6b4a]',
      shadowClass: 'shadow-[0_0_15px_rgba(255,107,74,0.48)]',
      line: true
    },
    {
      title: 'Daily Reflection',
      time: '05:00 PM',
      description: "AI summarizing today's key achievements and preparing tomorrow's briefing.",
      colorClass: 'bg-[#908fa0]',
      shadowClass: '',
      line: false
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500">
      <h3 className="text-xl font-bold font-display text-white mb-6 tracking-tight">Productivity Timeline</h3>
      
      <div className="space-y-6 relative">
        {events.map((evt, idx) => (
          <div key={idx} className="flex gap-4 relative group/item">
            {/* Left Dot and Line connector */}
            <div className="flex flex-col items-center">
              <div className={`w-3.5 h-3.5 rounded-full ${evt.colorClass} ${evt.shadowClass} mt-1.5 transition-transform duration-300 group-hover/item:scale-125 z-10`} />
              {evt.line && (
                <div className="w-[1px] h-full bg-white/10 mt-1.5 min-h-[3.5rem] group-hover/item:bg-white/20 transition-colors" />
              )}
            </div>

            {/* Right details content */}
            <div className={`flex-1 ${evt.line ? 'pb-6 border-b border-white/5' : ''}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-1.5">
                <h4 className={`font-bold font-display text-sm tracking-wide ${
                  evt.colorClass === 'bg-[#EF2F29]' 
                    ? 'text-[#EF2F29]' 
                    : evt.colorClass === 'bg-[#ff6b4a]' 
                    ? 'text-[#ff6b4a]' 
                    : 'text-white'
                }`}>
                  {evt.title}
                </h4>
                <span className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                  {evt.time}
                </span>
              </div>
              <p className="text-xs text-[#c7c4d7] leading-relaxed font-sans font-medium">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
