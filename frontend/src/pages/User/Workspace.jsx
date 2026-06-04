import { useState, useEffect, useRef } from 'react';
import { Plus, Menu, X, Terminal, Brain, CheckSquare, BarChart2 } from 'lucide-react';
import Sidebar from '../../components/User/Workspace/Sidebar';
import Header from '../../components/User/Workspace/Header';
import DashbordView from '../../components/User/Workspace/Dashboard/DashboardView'
import TasksView from '../../components/User/Workspace/Tasks/TasksView'
import AssistantView from '../../components/User/Workspace/Assistant/AssistantView'
import AnalyticsView from '../../components/User/Workspace/Analytics/AnalyticsView';
import { useUser } from '../../context/UserContext';

export default function Workspace({ onNavigate }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const blobsRef = useRef([]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#dae2fd] overflow-x-hidden font-sans pb-12 animate-fade-in">

      {/* Responsive Sidebar for desktop viewports */}
      <Sidebar onNavigate={onNavigate} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Mobile navigation header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] flex items-center justify-center">
            <span className="font-sans font-black text-xs text-[#ffffff]">T</span>
          </div>
          <span className="font-display font-extrabold text-lg text-white">Taskify</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-[#ffa940] transition-colors p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>


      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-40 flex flex-col p-8 pt-24 animate-fade-in gap-6">
          <button
            onClick={() => { setCurrentTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'dashboard' ? 'bg-[#b21b16]/20 text-[#ffa940]' : 'text-white'}`}
          >
            <Terminal className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => { setCurrentTab('tasks'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'tasks' ? 'bg-[#b21b16]/20 text-[#ffa940]' : 'text-white'}`}
          >
            <CheckSquare className="w-5 h-5" /> My Tasks
          </button>
          <button
            onClick={() => { setCurrentTab('assistant'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'assistant' ? 'bg-[#b21b16]/20 text-[#ffa940]' : 'text-white'}`}
          >
            <Brain className="w-5 h-5" /> AI Assistant
          </button>
          <button
            onClick={() => { setCurrentTab('analytics'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'analytics' ? 'bg-[#b21b16]/20 text-[#ffa940]' : 'text-white'}`}
          >
            <BarChart2 className="w-5 h-5" /> Analytics
          </button>

          <div className="h-[1px] bg-white/10 my-4" />

          <button
            onClick={() => { setIsMobileMenuOpen(false); onNavigate('landing'); }}
            className="w-full py-3.5 bg-gradient-to-r from-[#EF2F29] to-[#ff6b4a] text-[#ffffff] rounded-xl font-bold uppercase text-xs tracking-wider"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Global Header */}
      <Header 
      user={useUser().user}
      />

      {/* Main content grid viewports */}
      <main className="pt-24 md:pt-20 px-6 md:pl-[280px] md:pr-12 min-h-screen relative z-10">

        {currentTab === 'dashboard' ? (
          <DashbordView />
        ) : currentTab === 'tasks' ? (
          <TasksView />
        ) : currentTab === 'assistant' ? (
          <AssistantView />
        ) : currentTab === 'analytics' ? (
          <AnalyticsView />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] opacity-40 blur-lg rounded-2xl animate-pulse" />
              <div className="relative p-6 bg-[#0d0d0d] border border-white/10 rounded-2xl">
                <Brain className="w-12 h-12 text-[#ffa940] animate-bounce" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              {currentTab.replace('_', ' ')} Node Under Construction
            </h2>
            <p className="text-[#c7c4d7] text-sm mt-2 max-w-sm leading-relaxed">
              Taskify's AI agents are compiling requirements for this dynamic workspace. Check back shortly for updates.
            </p>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              Back to Dashboard Core
            </button>
          </div>
        )}

      </main>

      {/* Floating Action Button (FAB) for speedy task adding */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group cursor-pointer border border-white/15"
        onClick={() => alert('Coordinating Quantum Core: Add New Task...')}
      >
        <Plus className="w-6 h-6 text-[#ffffff] group-hover:rotate-90 transition-transform duration-300" />
      </button>

    </div>
  );
}
