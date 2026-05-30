import { FileText, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function StatsGrid() {
  const stats = [
    {
      title: 'Total Tasks',
      value: '1,284',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      colorClass: 'text-[#EF2F29] bg-[#EF2F29]/10',
      hoverBorder: 'hover:border-[#EF2F29]/50'
    },
    {
      title: 'Completed',
      value: '842',
      change: 'On Track',
      changeType: 'status',
      icon: CheckCircle2,
      colorClass: 'text-[#ffa940] bg-[#ffa940]/10',
      hoverBorder: 'hover:border-[#ffa940]/50'
    },
    {
      title: 'Pending',
      value: '442',
      change: 'Urgent',
      changeType: 'urgent',
      icon: Clock,
      colorClass: 'text-[#ff6b4a] bg-[#ff6b4a]/10',
      hoverBorder: 'hover:border-[#ff6b4a]/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx}
            className={`glass-card rounded-2xl p-6 flex flex-col justify-between group ${stat.hoverBorder} transition-all duration-300 shadow-md shadow-black/20`}
          >
            <div className="flex justify-between items-start">
              <span className={`p-2 rounded-lg ${stat.colorClass} transition-transform group-hover:scale-110 duration-300`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                stat.changeType === 'positive' 
                  ? 'text-[#EF2F29]' 
                  : stat.changeType === 'status' 
                  ? 'text-[#ffa940]' 
                  : 'text-[#ff6b4a]'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[#c7c4d7] text-xs font-mono uppercase tracking-widest">{stat.title}</p>
              <p className="text-3xl font-extrabold text-white mt-1 font-display tracking-tight">{stat.value}</p>
            </div>
          </div>
        );
      })}

      {/* Productivity Score Premium Bento Box with Rotating Holographic Ring */}
      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-[#EF2F29]/5 to-transparent border-[#EF2F29]/10 group hover:border-[#ffa940]/30 transition-all duration-300 shadow-md shadow-black/20">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full border-2 border-[#ffa940] border-t-transparent animate-spin flex items-center justify-center" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-4 h-4 text-[#ffa940] animate-pulse" />
          </div>
          <span className="px-2 py-0.5 bg-[#ffa940] text-[#050505] rounded font-mono text-[9px] font-bold tracking-widest">
            OPTIMIZED
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[#c7c4d7] text-xs font-mono uppercase tracking-widest">Productivity Score</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-extrabold text-[#ffa940] font-display tracking-tight">94%</p>
            <span className="text-[10px] text-[#c7c4d7] font-sans font-medium">Top 1%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
