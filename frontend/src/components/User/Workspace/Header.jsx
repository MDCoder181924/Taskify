import { Search, Bell, Settings } from 'lucide-react';

export default function Header({user}) {
  return (
    <header className="fixed top-0 w-full z-30 flex justify-between items-center px-6 md:px-12 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 md:pl-[280px]">
      {/* Search Input Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#c7c4d7] group-focus-within:text-[#ffa940] transition-colors" />
          <input 
            type="text"
            placeholder="Search tasks, docs, or AI commands..."
            className="w-full bg-[#0d0d0d] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:border-[#ffa940] focus:ring-0 focus:shadow-[0_0_20px_rgba(255,169,64,0.22)] outline-none transition-all placeholder-[#908fa0] text-[#dae2fd]"
          />
        </div>
      </div>

      {/* Quick Action Icons & Profile Info */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon Button */}
        <button 
          className="p-2 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded-xl transition-all cursor-pointer relative"
          onClick={() => alert('Coordinating Quantum System Alerts...')}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff6b4a] animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff6b4a]" />
        </button>

        {/* Settings Icon Button */}
        <button 
          className="p-2 text-[#c7c4d7] hover:text-[#EF2F29] hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          onClick={() => alert('Accessing settings node...')}
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-white/10" />

        {/* Professional User Profile Avatar with custom border */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#EF2F29]/30 hover:border-[#ffa940] transition-colors cursor-pointer shadow-lg shadow-black/45">
            <img 
              src={ user?.profilePic || "https://lh3.googleusercontent.com/aida-public/AB6AXuDh-tYbjzJNCirpj54A7LGIMHLt9m7qrq_B759F05rlG44XW1ksLq4i2pfI2TaFgb9RYkHNaUz_TZvO_0lXlKDrsBlgmU6XlE08Ht_4jQUOXA1mr_UI_oAOix54hzWCZy-YWyxh-3uZdTLOpeyaDJ_DS6xMNaqRzgfaBFL9woDfF9tio_FJ6OIzIVMsWa97JYNXPs61aKTjJ1-ZOIUcUMUoio-Lu9QyKf8dt9p3mKj_xBEjPbUhXo8ckHgj63nRJnGm5hvonpy4uA"} 
              alt="User profile avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col items-start leading-none">
            <span className="font-sans text-xs font-bold text-[#dae2fd]">{user?.fullName}</span>
            <span className="font-mono text-[9px] text-[#ffa940] uppercase tracking-wider mt-0.5 font-bold">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
