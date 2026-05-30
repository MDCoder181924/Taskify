import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPreview() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 29)); // Default to May 2026 matching system time

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Static mock grid representation from Stitch specs matching month layout
  const daysGrid = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true, hasEvent: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true, isToday: true }, // May 29, 2026 is Today matching system meta
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm font-display text-white tracking-wide uppercase">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button 
            className="p-1 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded transition-all cursor-pointer"
            onClick={() => alert('Coordinating previous calendar node...')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            className="p-1 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded transition-all cursor-pointer"
            onClick={() => alert('Coordinating next calendar node...')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono text-[#908fa0] mb-3 uppercase tracking-widest font-bold">
        {weekdays.map((wd, idx) => (
          <span key={idx}>{wd}</span>
        ))}
      </div>

      {/* Date Cells */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysGrid.map((cell, idx) => {
          return (
            <div
              key={idx}
              className={`h-8 flex flex-col items-center justify-center text-xs rounded-xl relative cursor-pointer select-none transition-all duration-200 ${
                cell.isToday
                  ? 'bg-gradient-to-tr from-[#EF2F29] to-[#b21b16] text-[#ffffff] font-extrabold shadow-[0_0_15px_rgba(239,47,41,0.45)] scale-105'
                  : cell.isCurrentMonth
                  ? 'text-white hover:bg-white/5 hover:text-[#ffa940] font-bold'
                  : 'text-[#908fa0] opacity-40 hover:bg-white/5'
              }`}
              onClick={() => cell.hasEvent && alert('Event Detected: project milestones verification')}
            >
              <span>{cell.day}</span>
              {cell.hasEvent && (
                <span className="absolute bottom-1 w-1 h-1 bg-[#ffa940] rounded-full shadow-[0_0_4px_#ffa940]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
