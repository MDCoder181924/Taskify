import { Activity, ShieldCheck, Cpu, RefreshCw, Zap } from 'lucide-react';

export default function TasksFooter({ activeCount, tasksCount }) {
  // Compute basic priority statistics dynamically for creative visualization
  const completedCount = tasksCount - activeCount;
  const completionRate = tasksCount > 0 ? Math.round((completedCount / tasksCount) * 100) : 0;

  return (
    <footer className="glass-card rounded-3xl p-5 mt-6 border-[#EF2F29]/15 bg-[#000000]/60 backdrop-blur-xl relative overflow-hidden group shadow-lg shadow-black/30">
      
      {/* Decorative vector laser lines matching premium dark mode aesthetics */}
      <div className="absolute bottom-0 right-0 w-80 h-32 bg-gradient-to-tr from-[#fbabff]/5 to-transparent blur-[50px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-32 bg-gradient-to-br from-[#4cd7f6]/5 to-transparent blur-[50px] pointer-events-none" />

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Telemetry Block 1: AI Engine Stats */}
        <div className="md:col-span-4 flex items-center gap-4 border-r border-white/5 pr-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EF2F29]/20 to-[#ffa8a5]/20 flex items-center justify-center border border-[#EF2F29]/25 shadow-inner">
            <Cpu className="w-5.5 h-5.5 text-[#ffa8a5] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm text-white tracking-wide">AI Synergy Telemetry</span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
            </div>
            <p className="text-[10px] font-mono text-[#c7c4d7] mt-0.5 uppercase tracking-wider">
              Complite Level: <span className="text-[#ffa8a5] font-bold">{completionRate}%</span>
            </p>
          </div>
        </div>

        {/* Telemetry Block 2: Priority/Completion health slider */}
        <div className="md:col-span-5 flex flex-col gap-2 px-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#c7c4d7] uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#EF2F29]" />
              Workload Health
            </span>
            <span className="text-white font-bold">{completionRate}% Synced</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#EF2F29] via-[#ff6b66] to-[#ffa8a5] rounded-full shadow-[0_0_10px_rgba(239,47,41,0.5)] transition-all duration-500" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Telemetry Block 3: Presence Node chips */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-1.5 pl-0 md:pl-4 border-l-0 md:border-l border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#908fa0] uppercase tracking-wider font-bold">
            <Zap className="w-3.5 h-3.5 text-[#ff6b66] animate-bounce" />
            Active AI nodes:
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase font-bold tracking-wider">
              AETHER: OK
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffa8a5]/10 border border-[#ffa8a5]/20 text-[#ffa8a5] font-mono text-[9px] uppercase font-bold tracking-wider">
              SYNAPSE: ON
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
