import { Inbox, CheckSquare, Calendar, Check, X } from 'lucide-react';

export default function ReceivedTasks({
  receivedTasks,
  handleCompleteTask,
  handleRejectTask
}) {
  return (
    <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-xl text-emerald-400">
            <Inbox className="w-5 h-5" />
          </div>
          <h2 className="font-display font-extrabold text-lg text-white">Received Milestones (Inbox)</h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {receivedTasks.filter(t => t.status === 'Pending').length} Pending
        </span>
      </div>

      {/* Tasks list */}
      <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
        {receivedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8 border border-dashed border-white/10 rounded-xl">
            <CheckSquare className="w-7 h-7 text-white/20 mb-2" />
            <p className="text-white/40 text-xs font-semibold">Inbox Empty</p>
            <p className="text-white/20 text-[10px] mt-1 leading-relaxed max-w-[240px]">
              You have no tasks assigned to your current simulated profile. Switch profiles to view other inboxes!
            </p>
          </div>
        ) : (
          receivedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white/5 border border-white/10 hover:border-white/15 rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
            >
              <div className="flex-1 min-w-0">
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
                  <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Due {task.dueDate}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 group-hover:text-[#ffa940] transition-colors leading-tight">
                  {task.title}
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-xl">
                  {task.description}
                </p>
                <p className="text-[10px] text-white/40 font-mono mt-2 flex items-center gap-1.5">
                  <span className="font-bold text-[#4cd7f6]">Assigned by:</span> {task.assigner}
                </p>
              </div>

              <div className="flex sm:flex-col items-stretch sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                {task.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="flex-1 sm:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white-always font-bold text-xs py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/10"
                    >
                      <Check className="w-4 h-4" />
                      <span>Complete</span>
                    </button>
                    <button
                      onClick={() => handleRejectTask(task.id)}
                      className="flex-1 sm:flex-initial bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-white/80 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wide border ${
                      task.status === 'Completed'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {task.status === 'Completed' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-red-400" />
                      )}
                      {task.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
