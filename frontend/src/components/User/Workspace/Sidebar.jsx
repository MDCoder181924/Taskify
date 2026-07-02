import { LayoutDashboard, CheckSquare, Bot, Users, Zap, HelpCircle, LogOut } from 'lucide-react';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Sidebar({ onNavigate, currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'collaboration', label: 'Collaboration', icon: Users }
  ];

  const naviget = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/user/logout", {});
      if (res.status === 200) {
        toast.success("Logged out successfully");
        naviget('/');
      }
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-4 z-40 bg-surface/50 backdrop-blur-xl border-r border-outline-variant/30 w-64 hidden md:flex transition-colors duration-300">
      {/* Brand Header */}
      <div className="flex flex-col gap-2 mb-8 mt-2">
        <div 
          className="flex items-center gap-3 px-4 py-2 cursor-pointer select-none group"
          onClick={() => onNavigate && onNavigate('landing')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-on-primary fill-current" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-none">
              Taskify
            </h1>
            <p className="text-[10px] text-tertiary uppercase tracking-widest font-bold mt-1">
              AI Productivity
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
               key={item.id}
               onClick={() => setCurrentTab(item.id)}
               className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                 isActive
                   ? 'bg-primary/10 text-primary border-l-4 border-primary translate-x-1 font-bold'
                   : 'text-on-surface-variant hover:bg-surface-high hover:text-on-surface'
               }`}
             >
              <Icon className="w-5 h-5" />
              <span className="font-sans text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User Controls */}
      <div className="mt-auto flex flex-col gap-2">
        {/* Upgrade Pro Widget */}
        <div className="relative group overflow-hidden rounded-xl mb-4 p-0.5">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>
          <button 
            className="w-full relative py-3 px-4 bg-surface text-on-surface rounded-xl font-bold shadow-lg hover:bg-surface-high transition-all text-xs tracking-wider uppercase border border-outline-variant/30"
            onClick={() => toast.success('Quantum Core Upgraded to Pro!')}
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Help Link */}
        <a 
          href="#help"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-high hover:text-on-surface rounded-xl transition-all font-sans text-sm"
          onClick={(e) => { e.preventDefault(); toast('Opening Quantum Assistance Node...'); }}
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </a>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-tertiary/10 hover:text-tertiary rounded-xl transition-all font-sans text-sm text-left w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
