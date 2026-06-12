import { Send, Trash2 } from 'lucide-react';

export default function SentTasks({
  sentTasks,
  handleDeleteTask
}) {
  return (
    <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#c0c1ff]/10 rounded-xl text-[#c0c1ff]">
            <Send className="w-5 h-5" />
          </div>
          <h2 className="font-display font-extrabold text-lg text-white">Delegated Objectives (Sent)</h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#c0c1ff]/15 text-[#c0c1ff] px-2.5 py-1 rounded-full uppercase tracking-wider">
          {sentTasks.length} Assigned
        </span>
      </div>

      {/* Tasks list */}
      <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
        {sentTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8 border border-dashed border-white/10 rounded-xl">
            <Send className="w-7 h-7 text-white/20 mb-2" />
            <p className="text-white/40 text-xs font-semibold">No Sent Tasks</p>
            <p className="text-white/20 text-[10px] mt-1 leading-relaxed max-w-[240px]">
              Tasks you delegate to project members will appear here so you can monitor progress.
            </p>
          </div>
        ) : (
          sentTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/60">
                    {task.projectName}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    task.priority === 'High'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                      : task.priority === 'Medium'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {task.priority} Prio
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 leading-tight">
                  {task.title}
                </h4>
                <p className="text-[10px] text-white/40 font-mono mt-1 flex items-center gap-1.5">
                  <span className="font-bold text-[#4cd7f6]">Assigned to:</span> {task.assignee}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                  task.status === 'Pending'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
                    : task.status === 'Completed'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {task.status}
                </span>
                
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                  title="Cancel Task Assignment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
