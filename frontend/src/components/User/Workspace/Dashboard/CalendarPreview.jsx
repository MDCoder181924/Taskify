import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPreview() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEventDay, setSelectedEventDay] = useState(null);

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1);
  // Get day of week (0: Sun, 1: Mon, ..., 6: Sat)
  const startDayOfWeek = firstDayOfMonth.getDay();
  // Adjust offset so Monday is 0 and Sunday is 6
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  // Number of days in current month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Number of days in previous month
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const daysGrid = [];

  // Trailing days from previous month
  for (let i = offset - 1; i >= 0; i--) {
    daysGrid.push({
      day: prevMonthTotalDays - i,
      isCurrentMonth: false
    });
  }

  // Days of current month
  const today = new Date();
  for (let i = 1; i <= totalDays; i++) {
    const isToday =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    daysGrid.push({
      day: i,
      isCurrentMonth: true,
      isToday,
      hasEvent: i === 10 || i === 20 // retaining premium event placeholders
    });
  }

  // Leading days of next month to fill 42 cells (6 rows) for a consistent layout
  const totalCells = 42;
  const remainingCells = totalCells - daysGrid.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysGrid.push({
      day: i,
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedEventDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedEventDay(null);
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm font-display text-white tracking-wide uppercase">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button 
            type="button"
            aria-label="Previous month"
            className="p-1 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded transition-all cursor-pointer"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            aria-label="Next month"
            className="p-1 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded transition-all cursor-pointer"
            onClick={handleNextMonth}
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
              onClick={() => setSelectedEventDay(cell.hasEvent ? cell.day : null)}
            >
              <span>{cell.day}</span>
              {cell.hasEvent && (
                <span className="absolute bottom-1 w-1 h-1 bg-[#ffa940] rounded-full shadow-[0_0_4px_#ffa940]" />
              )}
            </div>
          );
        })}
      </div>

      {selectedEventDay && (
        <p className="mt-4 text-xs font-medium text-[#ffa940]">
          Event detected on day {selectedEventDay}: project milestones verification
        </p>
      )}
    </div>
  );
}
