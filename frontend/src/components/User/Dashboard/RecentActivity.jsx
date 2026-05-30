export default function RecentActivity() {
  const activities = [
    {
      name: 'Sarah Chen',
      actionText: 'Merged 14 commits to ',
      highlightText: 'Quantum-App',
      highlightColor: 'text-[#ffa940]',
      time: '2 mins ago',
      status: 'active',
      borderColor: 'border-[#EF2F29]',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgQOTu3MRwk1NrKG2MmoH_PNfaPtdV8mstrbCYeBsEgMeasKRNuwuCw_6xYJFFl_gZCVXGfBiHaKTs6MkzY7aUGTv90rATEMy706kvO7chbgYax3RcYGx_0IME4uuclFdqaqBwCiFNHliPtWYLuavSDMlz7uGiGOjo1jvhhUqW9vJesvvjvjKPYcW8bEySoPoEHDtqKE0o9DOdOISsqI4rIGxoVg8z1N3xSehwo95pNwfl09wzru4ZlX5hRl8Ny_sjU-NQCb8oEw'
    },
    {
      name: 'Marcus Thorne',
      actionText: 'Approved ',
      highlightText: 'Milestone 4',
      highlightColor: 'text-[#ff6b4a]',
      postText: ' requirements',
      time: '15 mins ago',
      status: 'away',
      borderColor: 'border-[#ff6b4a]',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4mFe6wkMUvmWrb-zD1X46_P372WUzoVxF2jlpTiG7Viyiuv-tbCjhTW2acfUxr9-mvCdujDEfVe1DgWT8STNOvqMIzXwgE46qK-JDZ2oMpfj-hJHMO3N8zIHdkVSNC7RdXB7602Z889ZI_Y0xgJFYbm5J16nDfgISpCmhx6vDnoJ2zvmx8QG_PKX36TmihwwtMo5ZJc5mxYURWFt3UJm8QdeTCN_KlbMm8O05FUM1o27Bx_sk5bE0BwW_TsHIXjHsRTOZvyJYAA'
    },
    {
      name: 'Elena Rodriguez',
      actionText: 'Started AI training for ',
      highlightText: 'Predictive Ops',
      highlightColor: 'text-[#EF2F29]',
      time: '45 mins ago',
      status: 'active',
      borderColor: 'border-[#ffa940]',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQmyRYVBkGgn8dHru2pKmYrqtwLKvkEjj-R2FCBWV_7BXuWFfsejH1aIvsDpIWVDbKVjxagxyKsyqXM3F_b_F30D7-SXpJ_Pf7HL6QXK8SAUX5LP19jNm0l3Xo3ZL6gJYhinIeRB5e2hdLFxu4Xye5Z9AdAlpb7G_moOF0M5MUplXAdcYoER7t18es7d2RVO6osaGe_sFAv63L2X-MUwv4OsMzmNjmtqKwtz3lK9XszX4SlrcM6WICp3kImuTmWIiCYbTwq83hxQ'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl shadow-black/25 relative group hover:border-[#EF2F29]/30 transition-all duration-500 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-display text-white tracking-tight">Recent Activity</h3>
        <button 
          className="text-xs font-bold text-[#EF2F29] hover:text-[#ff6b4a] transition-colors cursor-pointer hover:underline"
          onClick={() => alert('Coordinating archive history feed...')}
        >
          View History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            {/* Avatar block with status dots */}
            <div className="relative shrink-0">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${act.borderColor} shadow-lg shadow-black/35`}>
                <img src={act.avatar} alt={act.name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#050505] ${
                act.status === 'active' 
                  ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' 
                  : 'bg-yellow-500 shadow-[0_0_8px_#eab308]'
              }`} />
            </div>

            {/* Content block */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-extrabold text-white truncate">{act.name}</h4>
              <p className="text-xs text-[#c7c4d7] mt-0.5 leading-relaxed">
                {act.actionText}
                <span className={`font-bold ${act.highlightColor}`}>{act.highlightText}</span>
                {act.postText}
              </p>
              <span className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider block mt-1">
                {act.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
