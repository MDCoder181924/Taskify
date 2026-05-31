import { useEffect, useRef } from 'react';
import { Calendar, MessageSquare, Paperclip, CheckSquare, Edit, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function KanbanBoard({ viewMode, tasks, setTasks, activeStatusTab }) {
  const containerRef = useRef(null);

  // Click-to-move status promotion action
  const moveStatus = (taskId, direction) => {
    const statuses = ['in_progress', 'review', 'completed'];
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const currentIndex = statuses.indexOf(task.status);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < statuses.length) {
            const nextStatus = statuses[nextIndex];
            const nextProgress = nextStatus === 'completed' ? 100 : task.progress;
            return { ...task, status: nextStatus, progress: nextProgress };
          }
        }
        return task;
      })
    );
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium': return 'bg-[#EF2F29]/10 text-[#EF2F29] border-[#EF2F29]/20';
      case 'Low': return 'bg-[#ffa8a5]/10 text-[#ffa8a5] border-[#ffa8a5]/20';
      default: return 'bg-green-400/10 text-green-400 border-green-400/20';
    }
  };

  const activeColTasks = tasks.filter(t => t.status === activeStatusTab);

  const renderCard = (task) => {
    const isCompleted = task.status === 'completed';
    return (
      <div 
        key={task.id}
        className={`glass-card p-5 rounded-2xl border-t border-l border-white/10 shadow-xl group hover:-translate-y-1 transition-all duration-300 ${
          isCompleted ? 'opacity-70 hover:opacity-100' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {task.status !== 'in_progress' && (
              <button 
                onClick={() => moveStatus(task.id, -1)}
                className="p-1 hover:bg-white/10 rounded text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
                title="Demote status"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
            {task.status !== 'completed' && (
              <button 
                onClick={() => moveStatus(task.id, 1)}
                className="p-1 hover:bg-white/10 rounded text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
                title="Promote status"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button 
              className="p-1 hover:bg-white/10 rounded text-[#c7c4d7] hover:text-white transition-colors"
              onClick={() => alert(`Opening Edit panel for: "${task.title}"`)}
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h4 className={`font-bold font-display text-white mb-2 leading-tight ${isCompleted ? 'line-through decoration-white/20' : ''}`}>
          {task.title}
        </h4>
        <p className="text-xs text-[#c7c4d7] line-clamp-2 mb-4 leading-relaxed font-sans font-medium">
          {task.description}
        </p>

        {/* Dynamic progress bar */}
        {!isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#c7c4d7] mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EF2F29] to-[#ffa8a5] shadow-[0_0_10px_rgba(239,47,41,0.5)] transition-all duration-300" 
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Complete Task Button */}
        {!isCompleted && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setTasks(prevTasks => 
                prevTasks.map(t => t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t)
              );
            }}
            className="w-full mb-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-sans font-bold text-xs uppercase tracking-wider hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-green-500/5 active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            Complete Task
          </button>
        )}

        {/* Footer info section */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
          <div className="flex -space-x-1.5">
            {task.assignees.map((avatar, aIdx) => (
              <div key={aIdx} className="w-6 h-6 rounded-full border border-black overflow-hidden shadow-md">
                <img src={avatar} alt="assignee avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-green-400 bg-green-400/5 px-2 py-0.5 rounded border border-green-400/10">
              <Check className="w-3 h-3" />
              <span>Approved by AI</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-xs text-[#c7c4d7] font-mono">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#908fa0]" />
                  <span>{task.dueDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    if (activeColTasks.length === 0) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center select-none animate-fade-in border border-dashed border-white/5 rounded-3xl bg-[#030303]/10 min-h-[40vh]">
          <CheckSquare className="w-12 h-12 text-[#ffa8a5] opacity-30 mb-4 animate-pulse" />
          <h4 className="font-display font-extrabold text-white text-base uppercase tracking-wider">No Tasks Present</h4>
          <p className="text-xs text-[#c7c4d7]/40 max-w-xs mt-1 leading-relaxed">
            There are no task nodes initialized in this sector. Click "Create Task" to deploy one.
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4 pt-1 pb-10 select-none animate-fade-in">
        {activeColTasks.map(task => {
          const isCompleted = task.status === 'completed';
          return (
            <div 
              key={task.id}
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#EF2F29]/30 transition-all duration-300 shadow-md shadow-black/25"
            >
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded border ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] font-mono text-[#c7c4d7]/40 uppercase tracking-widest font-bold">{task.category}</span>
                </div>
                <h4 className={`font-bold font-display text-white text-sm ${isCompleted ? 'line-through decoration-white/20 opacity-60' : ''}`}>
                  {task.title}
                </h4>
                <p className="text-xs text-[#c7c4d7]/70 font-sans max-w-xl leading-relaxed">{task.description}</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c7c4d7]">
                  {task.dueDate && <span>Due: {task.dueDate}</span>}
                </div>
                
                {!isCompleted && (
                  <button 
                    onClick={() => {
                      setTasks(prevTasks => 
                        prevTasks.map(t => t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t)
                      );
                    }}
                    className="px-4 py-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500 hover:text-black text-green-400 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (activeColTasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none animate-fade-in border border-dashed border-white/5 rounded-3xl bg-[#030303]/10 min-h-[40vh]">
        <CheckSquare className="w-12 h-12 text-[#ffa8a5] opacity-30 mb-4 animate-pulse" />
        <h4 className="font-display font-extrabold text-white text-base uppercase tracking-wider">No Tasks Present</h4>
        <p className="text-xs text-[#c7c4d7]/40 max-w-xs mt-1 leading-relaxed">
          There are no task nodes initialized in this sector. Click "Create Task" to deploy one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 pb-10 select-none animate-fade-in">
      {activeColTasks.map(renderCard)}
    </div>
  );
}
