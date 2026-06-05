import { isSameLocalDay, parseTaskDate } from '../../../../utils/dateUtils';

const priorityStyles = {
  High: {
    colorClass: 'bg-[#EF2F29]',
    shadowClass: 'shadow-[0_0_15px_rgba(239,47,41,0.48)]',
    textClass: 'text-[#EF2F29]'
  },
  Medium: {
    colorClass: 'bg-[#ff6b4a]',
    shadowClass: 'shadow-[0_0_15px_rgba(255,107,74,0.48)]',
    textClass: 'text-[#ff6b4a]'
  },
  Low: {
    colorClass: 'bg-[#ffa940]',
    shadowClass: 'shadow-[0_0_15px_rgba(255,169,64,0.42)]',
    textClass: 'text-[#ffa940]'
  }
};

export default function Timeline({ tasks = [] }) {
  const todayTasks = tasks
    .filter((task) => isSameLocalDay(task.taskDueDate))
    .sort((a, b) => {
      const dateA = parseTaskDate(a.taskDueDate)?.getTime() || 0;
      const dateB = parseTaskDate(b.taskDueDate)?.getTime() || 0;
      return dateA - dateB;
    })
    .slice(0, 4);

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500">
      <h3 className="text-xl font-bold font-display text-white mb-6 tracking-tight">Today Timeline</h3>

      {todayTasks.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/5 p-5 text-sm text-[#c7c4d7]">
          No tasks due today.
        </div>
      ) : (
        <div className="space-y-6 relative">
          {todayTasks.map((task, idx) => {
            const style = priorityStyles[task.taskPriority] || priorityStyles.Medium;
            const dueDate = parseTaskDate(task.taskDueDate);
            const dueTime = dueDate
              ? dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'Today';
            const line = idx < todayTasks.length - 1;

            return (
              <div key={task._id} className="flex gap-4 relative group/item">
                <div className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full ${style.colorClass} ${style.shadowClass} mt-1.5 transition-transform duration-300 group-hover/item:scale-125 z-10`} />
                  {line && (
                    <div className="w-[1px] h-full bg-white/10 mt-1.5 min-h-[3.5rem] group-hover/item:bg-white/20 transition-colors" />
                  )}
                </div>

                <div className={`flex-1 ${line ? 'pb-6 border-b border-white/5' : ''}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-1.5">
                    <h4 className={`font-bold font-display text-sm tracking-wide ${style.textClass}`}>
                      {task.taskTitle}
                    </h4>
                    <span className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      {dueTime}
                    </span>
                  </div>
                  <p className="text-xs text-[#c7c4d7] leading-relaxed font-sans font-medium">
                    {task.taskDescription || `${task.taskPriority} priority ${task.taskCategory} task.`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
