import { BellRing, RefreshCw } from 'lucide-react';

export default function InsightsPanel() {
  const previousInsights = [
    { title: 'Workflow Optimization', time: '2 hours ago' },
    { title: 'Email Batching Strategy', time: 'Yesterday' },
    { title: 'Deep Work Schedule', time: '3 days ago' }
  ];

  const smartReminders = [
    {
      title: 'Sync Q4 Report',
      time: 'Due in 45m',
      icon: BellRing,
      borderColor: 'border-l-2 border-[#ffa8a5]',
      iconColor: 'text-[#ffa8a5]'
    },
    {
      title: 'Weekly Review',
      time: 'Starting soon',
      icon: RefreshCw,
      borderColor: 'border-l-2 border-[#ff6b66]',
      iconColor: 'text-[#ff6b66]'
    }
  ];

  return (
    <section className="w-full lg:w-[22%] p-4 border-r border-white/5 flex flex-col gap-6 overflow-y-auto z-10 relative">
      
      {/* Previous Insights section */}
      <div>
        <h3 className="font-mono text-[10px] font-bold text-[#c7c4d7]/60 mb-3 tracking-widest uppercase">
          Previous Insights
        </h3>
        <div className="flex flex-col gap-2.5">
          {previousInsights.map((insight, idx) => (
            <div 
              key={idx}
              className="p-3 glass-card rounded-xl hover:bg-white/10 cursor-pointer transition-all group border border-white/5"
              onClick={() => alert(`Reviewing historical workflow: "${insight.title}"`)}
            >
              <p className="font-sans text-xs font-semibold text-[#c7c4d7] group-hover:text-[#EF2F29] transition-colors leading-tight">
                {insight.title}
              </p>
              <p className="text-[10px] text-[#c7c4d7]/40 mt-1 font-mono">{insight.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Reminders section */}
      <div>
        <h3 className="font-mono text-[10px] font-bold text-[#c7c4d7]/60 mb-3 tracking-widest uppercase">
          Smart Reminders
        </h3>
        <div className="flex flex-col gap-2.5">
          {smartReminders.map((reminder, idx) => {
            const Icon = reminder.icon;
            return (
              <div 
                key={idx}
                className={`flex items-start gap-3 p-3 glass-card rounded-xl border border-white/5 ${reminder.borderColor} transition-all hover:bg-white/5 cursor-pointer`}
                onClick={() => alert(`Focusing reminder node: "${reminder.title}"`)}
              >
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${reminder.iconColor} animate-pulse`} />
                <div>
                  <p className="font-sans text-xs font-semibold text-white leading-tight">
                    {reminder.title}
                  </p>
                  <p className={`text-[10px] font-mono mt-1 ${reminder.iconColor}`}>
                    {reminder.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
