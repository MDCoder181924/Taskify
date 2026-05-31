import { LayoutGrid, List, Search, Plus } from 'lucide-react';

export default function TasksHeader({ viewMode, setViewMode, searchQuery, setSearchQuery, onAddTaskClick }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10 z-10 relative w-full">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">My Tasks</h2>
        <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
        
        {/* Kanban vs List View Toggle buttons */}
        <div className="flex p-1 bg-[#080808] rounded-xl border border-white/5">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'kanban'
                ? 'bg-[#EF2F29] text-white shadow-lg'
                : 'text-[#c7c4d7] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Kanban
          </button>
          
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'list'
                ? 'bg-[#EF2F29] text-white shadow-lg'
                : 'text-[#c7c4d7] hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
        </div>

        {/* Create Task Action Button */}
        <button 
          onClick={onAddTaskClick}
          className="px-4 py-2 bg-gradient-to-r from-[#EF2F29] to-[#ff6b66] text-white rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#EF2F29]/15 hover:shadow-[#EF2F29]/30 transition-all hover:scale-105 active:scale-95 ml-2"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Internal View Search bar */}
      <div className="w-full md:w-64 relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c7c4d7] group-focus-within:text-[#EF2F29] transition-colors" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-[#080808] border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs focus:border-[#EF2F29] focus:ring-0 focus:shadow-[0_0_15px_rgba(239,47,41,0.15)] outline-none transition-all placeholder-[#908fa0] text-white font-medium"
        />
      </div>
    </div>
  );
}
