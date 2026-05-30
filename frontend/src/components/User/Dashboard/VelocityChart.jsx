import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function VelocityChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  // Simulated chart data points for interactive state triggers
  const chartPoints = [
    { cx: 0, cy: 150, label: 'Mon', value: 34 },
    { cx: 133, cy: 110, label: 'Tue', value: 45 },
    { cx: 266, cy: 125, label: 'Wed', value: 42 },
    { cx: 400, cy: 80, label: 'Thu', value: 68, active: true },
    { cx: 533, cy: 95, label: 'Fri', value: 52 },
    { cx: 666, cy: 110, label: 'Sat', value: 48 },
    { cx: 800, cy: 40, label: 'Sun', value: 82 }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-[#EF2F29]/30 transition-all duration-500 shadow-xl shadow-black/25">
      {/* Background radial glow leaks */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#ffa940]/5 blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold font-display text-white tracking-tight">Velocity Insight</h2>
          <p className="text-xs text-[#c7c4d7] mt-1 font-sans">Weekly task completion vs velocity trends</p>
        </div>
        
        {/* Toggle Range buttons */}
        <div className="flex gap-2 bg-[#000000]/40 p-1.5 rounded-full border border-white/5">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-[#b21b16] text-white'
                  : 'text-[#908fa0] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-60 w-full relative flex flex-col justify-between pt-2">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none z-0">
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="relative w-full h-44 z-10">
          <svg 
            className="w-full h-full overflow-visible transition-all duration-300"
            viewBox="0 0 800 200" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EF2F29" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EF2F29" stopOpacity="0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Filled Area Gradient */}
            <path 
              d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40 V200 H0 Z" 
              fill="url(#chartGradient)" 
              className="transition-all duration-500"
            />

            {/* Stroke Line */}
            <path 
              d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40" 
              fill="none" 
              stroke="#EF2F29" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              filter="url(#neonGlow)"
              className="transition-all duration-500"
            />

            {/* Glowing Interactive Anchor Circles */}
            {chartPoints.map((pt, idx) => (
              <g 
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle 
                  cx={pt.cx} 
                  cy={pt.cy} 
                  r="9" 
                  fill="#EF2F29" 
                  opacity={hoveredPoint?.label === pt.label || pt.active ? 0.3 : 0} 
                  className="transition-all duration-200" 
                />
                <circle 
                  cx={pt.cx} 
                  cy={pt.cy} 
                  r="4.5" 
                  fill={pt.active ? '#ff6b4a' : '#EF2F29'} 
                  stroke="#050505" 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              </g>
            ))}
          </svg>

          {/* Interactive Tooltip Overlay */}
          {hoveredPoint && (
            <div 
              className="absolute bg-[#0d0d0d] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-2xl z-20 pointer-events-none transition-all duration-150 animate-fade-in"
              style={{
                left: `${(hoveredPoint.cx / 800) * 100}%`,
                top: `${(hoveredPoint.cy / 200) * 100 - 32}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="font-mono text-[9px] text-[#ffa940] uppercase tracking-wider font-bold">
                {hoveredPoint.label}
              </div>
              <div className="font-display font-extrabold text-white mt-0.5">
                {hoveredPoint.value} Tasks Completed
              </div>
            </div>
          )}
        </div>

        {/* Legend / Weekday Labels */}
        <div className="flex justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-[#908fa0] uppercase tracking-widest px-2">
          {chartPoints.map((pt, idx) => (
            <span 
              key={idx} 
              className={`transition-colors duration-200 ${
                hoveredPoint?.label === pt.label ? 'text-[#ffa940] font-bold' : ''
              }`}
            >
              {pt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
