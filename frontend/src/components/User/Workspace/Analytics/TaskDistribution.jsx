import { Layers } from 'lucide-react';

export default function TaskDistribution() {
  const categories = [
    { label: 'Engineering', percent: '40%', colorClass: 'bg-[#EF2F29]', textClass: 'text-[#EF2F29]' },
    { label: 'Marketing', percent: '25%', colorClass: 'bg-[#ff6b66]', textClass: 'text-[#ff6b66]' },
    { label: 'Design', percent: '35%', colorClass: 'bg-[#ffa8a5]', textClass: 'text-[#ffa8a5]' }
  ];

  return (
    <div className="glass-card bg-[#080808]/30 border border-white/10 hover:border-[#EF2F29]/30 p-6 rounded-3xl transition-all duration-300 shadow-xl shadow-black/25">
      <h4 className="font-display font-extrabold text-white text-base mb-6">Task Distribution</h4>
      
      <div className="flex flex-col md:flex-row items-center gap-8 py-2">
        {/* Segmented Ring SVG Pie Chart */}
        <div className="relative w-40 h-40 shrink-0 select-none">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Category 1: Engineering (40%) */}
            <path 
              className="text-[#EF2F29]" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeDasharray="40, 100" 
              strokeWidth="3.2" 
              strokeLinecap="round"
            />
            {/* Category 2: Marketing (25%) */}
            <path 
              className="text-[#ff6b66]" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeDasharray="25, 100" 
              strokeDashoffset="-40" 
              strokeWidth="3.2" 
              strokeLinecap="round"
            />
            {/* Category 3: Design (35%) */}
            <path 
              className="text-[#ffa8a5]" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeDasharray="35, 100" 
              strokeDashoffset="-65" 
              strokeWidth="3.2" 
              strokeLinecap="round"
            />
          </svg>
          
          {/* Centered Decorative Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <Layers className="w-8 h-8 text-[#f3f4f6]" />
          </div>
        </div>

        {/* Categories Legends lists */}
        <div className="flex-1 space-y-4 w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between font-sans">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cat.colorClass}`} />
                <span className="text-white text-xs font-semibold">{cat.label}</span>
              </div>
              <span className={`font-mono text-xs font-bold ${cat.textClass}`}>
                {cat.percent}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
