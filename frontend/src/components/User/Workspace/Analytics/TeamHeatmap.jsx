export default function TeamHeatmap() {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const teamData = [
    {
      name: 'Sarah J.',
      color: 'bg-primary', // Primary
      values: [0.2, 0.6, 1.0, 0.8, 0.4, 0.0, 0.0]
    },
    {
      name: 'Mark T.',
      color: 'bg-tertiary', // Tertiary
      values: [0.8, 1.0, 0.6, 0.4, 0.9, 0.0, 0.0]
    },
    {
      name: 'Linda K.',
      color: 'bg-secondary', // Secondary
      values: [0.4, 0.6, 0.8, 1.0, 0.7, 0.0, 0.0]
    }
  ];

  return (
    <div className="glass-card bg-[#080808]/30 border border-white/10 hover:border-primary/30 p-6 rounded-3xl overflow-x-auto transition-all duration-300 shadow-xl shadow-black/25 flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 min-w-[500px]">
        <h4 className="font-display font-extrabold text-white text-base">Team Efficiency Heatmap</h4>
        <span className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider font-bold">
          Activity intensity per member / day
        </span>
      </div>

      {/* Grid Heatmap Table */}
      <div className="grid grid-cols-8 gap-2 min-w-[500px] select-none py-2">
        {/* Row 1 Headers */}
        <div className="h-8 shrink-0" />
        {weekdays.map((day, idx) => (
          <div key={idx} className="text-[10px] font-mono font-bold text-[#c7c4d7]/70 text-center uppercase tracking-widest flex items-center justify-center">
            {day}
          </div>
        ))}

        {/* Member rows mapping */}
        {teamData.map((member, rIdx) => (
          <div key={rIdx} className="contents">
            {/* Member Name */}
            <div className="text-xs font-semibold text-white flex items-center pr-2 font-sans">
              {member.name}
            </div>

            {/* Daily heatmap blocks */}
            {member.values.map((val, cIdx) => {
              const isInactive = val === 0.0;
              return (
                <div 
                  key={cIdx}
                  className={`h-8 rounded-lg relative group/cell transition-all duration-300 ${
                    isInactive 
                      ? 'bg-white/5 border border-white/5' 
                      : `${member.color} shadow-lg shadow-black/10`
                  }`}
                  style={{ opacity: isInactive ? 0.35 : val }}
                >
                  {/* Tooltip detail */}
                  {!isInactive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#080808] border border-white/15 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover/cell:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-xl">
                      {Math.round(val * 100)}% Intensity
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
