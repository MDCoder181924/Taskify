import { Users, Inbox, CheckSquare, Send } from 'lucide-react';

export default function CollaborationStats({ 
  userProjectsCount, 
  pendingReceivedCount, 
  completedReceivedCount, 
  totalSentCount 
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="relative group overflow-hidden bg-[#0d0d0d]/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-white/50">My Projects</p>
            <h3 className="text-2xl font-black text-white mt-1.5">{userProjectsCount}</h3>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 text-[#ffa940]">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="relative group overflow-hidden bg-[#0d0d0d]/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#4cd7f6] rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-white/50">Inbox Tasks</p>
            <h3 className="text-2xl font-black text-[#4cd7f6] mt-1.5">{pendingReceivedCount}</h3>
          </div>
          <div className="p-2.5 rounded-xl bg-[#4cd7f6]/10 text-[#4cd7f6]">
            <Inbox className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative group overflow-hidden bg-[#0d0d0d]/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-white/50">Tasks Completed</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1.5">{completedReceivedCount}</h3>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="relative group overflow-hidden bg-[#0d0d0d]/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#c0c1ff] rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-white/50">Sent Tasks</p>
            <h3 className="text-2xl font-black text-[#c0c1ff] mt-1.5">{totalSentCount}</h3>
          </div>
          <div className="p-2.5 rounded-xl bg-[#c0c1ff]/10 text-[#c0c1ff]">
            <Send className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
