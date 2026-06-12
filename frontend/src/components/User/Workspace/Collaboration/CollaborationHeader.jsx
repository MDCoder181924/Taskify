import { toast } from 'react-hot-toast';

export default function CollaborationHeader({ 
  simulatedUser, 
  setSimulatedUser, 
  allKnownUsers, 
  primaryUserEmail 
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8 z-10 relative">
      <div>
        <span className="font-mono text-[10px] font-bold text-[#ffa940] uppercase tracking-widest block mb-1">
          Taskify Workspaces
        </span>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-none">
          Collaboration Spaces
        </h1>
      </div>

      {/* Identity Switcher Widget */}
      <div className="bg-[#0d0d0d]/90 border border-white/10 hover:border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all w-full xl:w-auto shadow-xl shadow-black/30">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0d0d] rounded-full animate-pulse"></span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] flex items-center justify-center font-bold text-white text-sm">
              {simulatedUser.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono font-bold text-[#4cd7f6] tracking-wider">Simulating Identity</p>
            <p className="text-xs text-white/70 max-w-[200px] truncate font-medium">{simulatedUser}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-white/40 text-xs hidden sm:inline">Switch:</span>
          <select
            value={simulatedUser}
            onChange={(e) => {
              setSimulatedUser(e.target.value);
              toast.success(`Identity switched to ${e.target.value}`);
            }}
            className="bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#ffa940]/60 focus:bg-white/10 transition-all cursor-pointer w-full sm:w-auto min-w-[170px]"
          >
            {allKnownUsers.map(email => (
              <option key={email} value={email} className="bg-[#0d0d0d] text-white">
                {email === primaryUserEmail ? `${email} (You)` : email}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
