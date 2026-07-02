import { useState, useEffect, useRef } from 'react';
import { Plus, Menu, X, Terminal, Brain, CheckSquare, Users } from 'lucide-react';
import Sidebar from '../../components/User/Workspace/Sidebar';
import Header from '../../components/User/Workspace/Header';
import DashbordView from '../../components/User/Workspace/Dashboard/DashboardView'
import TasksView from '../../components/User/Workspace/Tasks/TasksView'
import AssistantView from '../../components/User/Workspace/Assistant/AssistantView'
import CollaborationView from '../../components/User/Workspace/Collaboration/CollaborationView';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function Workspace({ onNavigate }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-on-background overflow-x-hidden font-sans pb-12 animate-fade-in transition-colors duration-300">

      {/* Responsive Sidebar for desktop viewports */}
      <Sidebar onNavigate={onNavigate} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Mobile navigation header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-background/90 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
            <span className="font-sans font-black text-xs text-on-primary">T</span>
          </div>
          <span className="font-display font-extrabold text-lg text-on-surface">Taskify</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-on-surface hover:text-primary transition-colors p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col p-8 pt-24 animate-fade-in gap-6">
          <button
            onClick={() => { setCurrentTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'dashboard' ? 'bg-primary/15 text-primary' : 'text-on-surface-variant'}`}
          >
            <Terminal className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => { setCurrentTab('tasks'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'tasks' ? 'bg-primary/15 text-primary' : 'text-on-surface-variant'}`}
          >
            <CheckSquare className="w-5 h-5" /> My Tasks
          </button>
          <button
            onClick={() => { setCurrentTab('assistant'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'assistant' ? 'bg-primary/15 text-primary' : 'text-on-surface-variant'}`}
          >
            <Brain className="w-5 h-5" /> AI Assistant
          </button>
          <button
            onClick={() => { setCurrentTab('collaboration'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold ${currentTab === 'collaboration' ? 'bg-primary/15 text-primary' : 'text-on-surface-variant'}`}
          >
            <Users className="w-5 h-5" /> Collaboration
          </button>

          <div className="h-[1px] bg-outline-variant/35 my-4" />

          <button
            onClick={() => { setIsMobileMenuOpen(false); onNavigate('landing'); }}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-xl font-bold uppercase text-xs tracking-wider"
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
        ) : currentTab === 'collaboration' ? (
          <CollaborationView />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-secondary opacity-40 blur-lg rounded-2xl animate-pulse" />
              <div className="relative p-6 bg-surface-low border border-outline-variant/30 rounded-2xl">
                <Brain className="w-12 h-12 text-tertiary animate-bounce" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-on-surface tracking-tight uppercase">
              {currentTab.replace('_', ' ')} Node Under Construction
            </h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-sm leading-relaxed">
              Taskify's AI agents are compiling requirements for this dynamic workspace. Check back shortly for updates.
            </p>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-surface-high hover:bg-surface text-on-surface font-bold text-xs uppercase tracking-widest border border-outline-variant/30 hover:border-outline-variant transition-all cursor-pointer"
            >
              Back to Dashboard Core
            </button>
          </div>
        )}

      </main>

      {/* Floating Action Button (FAB) for speedy task adding */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group cursor-pointer border border-outline-variant/20"
        onClick={() => toast('Coordinating Quantum Core: Add New Task...')}
      >
        <Plus className="w-6 h-6 text-on-primary group-hover:rotate-90 transition-transform duration-300" />
      </button>

    </div>
  );
}
