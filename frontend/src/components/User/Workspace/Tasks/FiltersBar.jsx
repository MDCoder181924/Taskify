import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function FiltersBar({ 
  priorityFilter, 
  setPriorityFilter, 
  categoryFilter, 
  setCategoryFilter, 
  activeCount, 
  onClearAll 
}) {
  return (
    <div className="py-4 flex flex-wrap items-center gap-4 border-b border-white/5 bg-[#030303]/20 px-1 relative z-20">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-mono font-bold text-[#c7c4d7] uppercase tracking-wider flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#EF2F29]" />
          Filter by:
        </span>

        {/* Priority dropdown filter selection */}
        <div className="relative group/filter">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-8 text-xs font-bold text-[#c7c4d7] hover:border-[#EF2F29]/50 outline-none transition-all cursor-pointer"
          >
            <option value="All" className="bg-[#000000] text-white">Priority: All</option>
            <option value="High" className="bg-[#000000] text-white">High</option>
            <option value="Medium" className="bg-[#000000] text-white">Medium</option>
            <option value="Low" className="bg-[#000000] text-white">Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#c7c4d7] pointer-events-none" />
        </div>

        {/* Category dropdown filter selection */}
        <div className="relative group/filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-8 text-xs font-bold text-[#c7c4d7] hover:border-[#EF2F29]/50 outline-none transition-all cursor-pointer"
          >
            <option value="All" className="bg-[#000000] text-white">Category: All</option>
            <option value="Synaptic" className="bg-[#000000] text-white">Synaptic</option>
            <option value="Model Inference" className="bg-[#000000] text-white">Model Inference</option>
            <option value="Security" className="bg-[#000000] text-white">Security</option>
            <option value="Launch" className="bg-[#000000] text-white">Launch</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#c7c4d7] pointer-events-none" />
        </div>
      </div>

      {/* Counters & Reset Actions */}
      <div className="ml-auto flex items-center gap-4 text-xs font-sans">
        <span className="text-[#c7c4d7] font-semibold">{activeCount} Tasks Matches</span>
        {(priorityFilter !== 'All' || categoryFilter !== 'All') && (
          <button 
            onClick={onClearAll}
            className="text-[#EF2F29] font-bold hover:text-white underline underline-offset-4 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
