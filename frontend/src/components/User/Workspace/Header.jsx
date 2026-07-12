import { Bell, Settings, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../../../context/ThemeContext';

export default function Header({ user }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full z-30 flex justify-end items-center px-6 md:px-12 h-16 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 md:pl-[280px] transition-colors duration-300">

      {/* Quick Action Icons & Profile Info */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-high rounded-xl transition-all cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Icon Button */}
        <button 
          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-high rounded-xl transition-all cursor-pointer relative"
          onClick={() => toast('Coordinating Quantum System Alerts...')}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
        </button>

        {/* Settings Icon Button */}
        <button 
          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-high rounded-xl transition-all cursor-pointer"
          onClick={() => toast('Accessing settings node...')}
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-outline-variant/35" />

        {/* Professional User Profile Avatar with custom border */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 hover:border-primary transition-colors cursor-pointer shadow-lg">
            <img 
              src={ user?.profilePic || "https://lh3.googleusercontent.com/aida-public/AB6AXuDh-tYbjzJNCirpj54A7LGIMHLt9m7qrq_B759F05rlG44XW1ksLq4i2pfI2TaFgb9RYkHNaUz_TZvO_0lXlKDrsBlgmU6XlE08Ht_4jQUOXA1mr_UI_oAOix54hzWCZy-YWyxh-3uZdTLOpeyaDJ_DS6xMNaqRzgfaBFL9woDfF9tio_FJ6OIzIVMsWa97JYNXPs61aKTjJ1-ZOIUcUMUoio-Lu9QyKf8dt9p3mKj_xBEjPbUhXo8ckHgj63nRJnGm5hvonpy4uA"} 
              alt="User profile avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col items-start leading-none">
            <span className="font-sans text-xs font-bold text-on-surface">{user?.fullName}</span>
            <span className="font-mono text-[9px] text-tertiary uppercase tracking-wider mt-0.5 font-bold">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
