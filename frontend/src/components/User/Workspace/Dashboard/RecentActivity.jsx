import { parseTaskDate } from '../../../../utils/dateUtils';

const getActivityTime = (task) => {
  const date = parseTaskDate(task.updatedAt || task.createdAt || task.taskDueDate);

  if (!date) {
    return 'Recently';
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const getStatusText = (status) => {
  if (status === 'completed') return 'Completed';
  if (status === 'review') return 'In review';
  return 'In progress';
};

export default function RecentActivity({ tasks = [] }) {
  const activities = [...tasks]
    .sort((a, b) => {
      const dateA = parseTaskDate(a.updatedAt || a.createdAt || a.taskDueDate)?.getTime() || 0;
      const dateB = parseTaskDate(b.updatedAt || b.createdAt || b.taskDueDate)?.getTime() || 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-display text-white tracking-tight">Recent Activity</h3>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/5 p-5 text-sm text-[#c7c4d7]">
          No task activity yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((task) => {
            const isCompleted = task.taskStatus === 'completed';
            const borderColor = isCompleted ? 'border-[#ffa940]' : 'border-[#EF2F29]';
            const highlightColor = isCompleted ? 'text-[#ffa940]' : 'text-[#EF2F29]';
            const initial = task.taskTitle?.trim()?.[0]?.toUpperCase() || 'T';

            return (
              <div
                key={task._id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full border-2 ${borderColor} shadow-lg shadow-black/35 bg-[#0d0d0d] flex items-center justify-center`}>
                    <span className="text-sm font-extrabold text-white">{initial}</span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#050505] ${
                    isCompleted
                      ? 'bg-green-500 shadow-[0_0_8px_#22c55e]'
                      : 'bg-yellow-500 shadow-[0_0_8px_#eab308]'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-white truncate">{task.taskTitle}</h4>
                  <p className="text-xs text-[#c7c4d7] mt-0.5 leading-relaxed">
                    Status changed to <span className={`font-bold ${highlightColor}`}>{getStatusText(task.taskStatus)}</span>
                  </p>
                  <span className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider block mt-1">
                    {getActivityTime(task)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
