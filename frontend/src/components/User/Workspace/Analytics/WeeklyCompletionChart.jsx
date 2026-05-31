export default function WeeklyCompletionChart() {
  const weeklyData = [
    { label: 'Mon', actualHeight: 'h-[60%]', value: 60 },
    { label: 'Tue', actualHeight: 'h-[85%]', value: 85 },
    { label: 'Wed', actualHeight: 'h-[45%]', value: 45 },
    { label: 'Thu', actualHeight: 'h-[92%]', value: 92 },
    { label: 'Fri', actualHeight: 'h-[70%]', value: 70 },
    { label: 'Sat', actualHeight: 'h-[30%]', value: 30 },
    { label: 'Sun', actualHeight: 'h-[20%]', value: 20 }
  ];

  return (
    <div className="glass-card bg-[#080808]/30 border border-white/10 hover:border-[#EF2F29]/30 p-6 rounded-3xl transition-all duration-300 shadow-xl shadow-black/25 flex flex-col justify-between">
      
      {/* Header with legends */}
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-display font-extrabold text-white text-base">Weekly Completion Rate</h4>
        
        {/* Legends */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#EF2F29]/10 rounded-full border border-[#EF2F29]/20">
            <div className="w-2 h-2 rounded-full bg-[#EF2F29] shadow-[0_0_6px_#EF2F29]" />
            <span className="text-[10px] font-mono font-bold text-[#EF2F29] uppercase">Actual</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#ffa8a5]/10 rounded-full border border-[#ffa8a5]/20">
            <div className="w-2 h-2 rounded-full bg-[#ffa8a5] shadow-[0_0_6px_#ffa8a5]" />
            <span className="text-[10px] font-mono font-bold text-[#ffa8a5] uppercase">Target</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="h-60 flex items-end justify-between gap-3 md:gap-5 px-2 pb-6 border-b border-white/5 relative">
        
        {/* Weekly Bars */}
        {weeklyData.map((data, idx) => (
          <div key={idx} className="w-full h-full flex flex-col justify-end items-center gap-3 group cursor-pointer relative">
            
            {/* Background Full Track container bar */}
            <div className="w-full bg-white/5 rounded-t-lg h-full flex items-end relative overflow-hidden group-hover:bg-white/10 transition-colors">
              {/* Actual Completed overlay bar */}
              <div 
                className={`w-full bg-gradient-to-t from-[#b81b16] to-[#EF2F29] rounded-t-lg transition-all duration-700 ease-out group-hover:brightness-110 shadow-[0_0_12px_rgba(239,47,41,0.15)] ${data.actualHeight}`} 
              />
              
              {/* Tooltip on hover */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#080808] border border-white/10 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-20 whitespace-nowrap">
                {data.value}% Completed
              </div>
            </div>
            
            {/* Weekday Label */}
            <span className="text-[10px] font-mono text-[#908fa0] group-hover:text-[#EF2F29] transition-colors font-bold uppercase">
              {data.label}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}
