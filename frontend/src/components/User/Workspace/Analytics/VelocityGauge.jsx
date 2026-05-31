import { Gauge } from 'lucide-react';

export default function VelocityGauge() {
  return (
    <div className="glass-card bg-[#080808]/30 border border-white/10 hover:border-[#EF2F29]/30 p-6 rounded-3xl flex flex-col transition-all duration-300 shadow-xl shadow-black/25">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-display font-extrabold text-white text-base">Velocity</h4>
        <Gauge className="w-5 h-5 text-[#c7c4d7] animate-pulse" />
      </div>

      {/* Circle Gauge SVG */}
      <div className="relative flex-1 flex items-center justify-center py-6 select-none">
        <svg className="w-44 h-44 -rotate-90 overflow-visible" viewBox="0 0 100 100">
          {/* Base Background Track Circle */}
          <circle 
            className="text-white/5" 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="7" 
          />
          {/* Dynamic Fill Path Circle with glow shadow */}
          <circle 
            className="text-[#EF2F29] transition-all duration-1000" 
            cx="50" 
            cy="50" 
            fill="transparent" 
            r="45" 
            stroke="currentColor" 
            strokeWidth="7.5"
            strokeDasharray="282.7" 
            strokeDashoffset="56.5" 
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(239, 47, 41, 0.4))'
            }}
          />
        </svg>

        {/* Numeric Gauge Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display font-extrabold text-4xl text-[#EF2F29] tracking-tighter drop-shadow-[0_0_15px_rgba(239, 47, 41, 0.2)]">
            82
          </span>
          <span className="font-mono text-[9px] text-[#c7c4d7]/70 uppercase tracking-widest font-bold mt-1">
            km/opt
          </span>
        </div>
      </div>

      {/* Description text */}
      <p className="text-[#c7c4d7] text-center text-xs mt-4 leading-relaxed font-sans font-medium">
        Total Operational Velocity is <span className="text-[#ffa8a5] font-bold">14% higher</span> than your set baseline.
      </p>

    </div>
  );
}
