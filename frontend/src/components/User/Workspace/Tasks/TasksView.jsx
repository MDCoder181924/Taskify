import { useState } from 'react';
import TasksHeader from './TasksHeader';
import FiltersBar from './FiltersBar';
import KanbanBoard from './KanbanBoard';
import TasksFooter from './TasksFooter';

export default function TasksView() {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeStatusTab, setActiveStatusTab] = useState('in_progress'); // 'in_progress', 'review', 'completed'

  // Modal and new task form inputs states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // Hardcoded static tasks list matching mock specification with assignee images
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Neural Interface Wireframes',
      description: 'Define the core interaction models for the synaptic feedback loops in the MVP dashboard.',
      priority: 'High',
      progress: 0,
      status: 'in_progress', // Default to in_progress since backlog is removed
      category: 'Synaptic',
      dueDate: 'Oct 24',
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCf_adT4WqUN-Sv-ma_hbIhZx82TRXTvwVuaggZJKYwvvxaD1kZv2ajaOEmiIhee2n4F8Nlstr-WSl0buPg6Cy7k-y6qMhMxPyPebx2vN7n_MQ0Esn9E1zNXBfbPxDoRTtcag8YKhGYXRxn0LF5gy04w7JnyeC5c4_OokYaigCgbSxzQVwuHkPok2vvIGBzl03QE8LEM7wZpGX5R4uNEHICj3fk6rVuFJ6A8dSrC04TUdLEGmfZqjadzyM52NQyuh9TvYWr-r85Ug'
      ]
    },
    {
      id: 'task-2',
      title: 'AI Training Module Redesign',
      description: 'Visualizing the latent space during real-time model inference updates.',
      priority: 'Medium',
      progress: 65,
      status: 'in_progress',
      category: 'Model Inference',
      comments: 12,
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCmlILr7rjcCT4PjSe4nNwB68VkoIaoR8mjO-FzLzmL5Wvs8UP9sDsH3SehCh130U_K5WiK8nG_oOlj_TbxsWjA9elFYhnHr_kVxwcTHN9_9-6061oFWEgyoWP9LA9szDkqxTUFUAgUOmxE82wGNvRBtcydYyAn0UzXC-DcutV5jWn6k_yq2tFLZI_iSMDFBHIzJoTh95Q4I_TAmZ3-kT9YHpWqPkLLEeO3e3YX8XRBcsLGSwx3lUMUuf8q_JJ6CMLSHNzzX61y3w',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDNi-C3OZZANcnzqh6diFbghFmbczyoCkuk61mUheBIBZDSZZs8ubxGnE9ciizxpjVdHDf38kVbwo17teL_w7R7sbQ2gu0lyqCzBKLjCY1st7Ks42KpR3c1KNpRQUNwqDNhhYX07HqZTWcE7bf1AF5WtRbYZlK3rwPNlBryf4B7wAFgTzVmLYEGOT6F78vgnTk8nPZPBX5O6qYLqWREgyjSLVaH3aXQWGxiWusbUV8I53Zw2xC9RyLmH9fBsH-8q1ySRPJFJCKzyw'
      ]
    },
    {
      id: 'task-3',
      title: 'Quantum Crypto Integration',
      description: 'Final security audit for the post-quantum encryption layer implementation.',
      priority: 'Low',
      progress: 90,
      status: 'review',
      category: 'Security',
      attachments: 3,
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLgPkWL_6iYAe_Q3n9mfvHu4Lszv3TahVRPsGeILk1TzRMs---wgJ_9ZTgqYOXBv8Gh6dck5McxMPl22ZfVlEHsNbAq8aOOmMMBd-aGZK8Iq6dDXdkcMtW5SF32uwBTl1yGmBlPiqiDzkOUUsLBI77J8w3yoR7oAdkATduYuQpEy9bO3z1f6zQdB5KGm4s15milf4vro8A2bf90FutfluvEvDk5k7Rsw26zt5jQUfEMKJUGa_z1vPEuq_3e4xqH9_Bdi84p2Dq5w'
      ]
    },
    {
      id: 'task-4',
      title: 'Holographic Logo Render',
      description: 'Exporting 8K assets for the 2024 launch event keynote visuals.',
      priority: 'Low',
      progress: 100,
      status: 'completed',
      category: 'Launch',
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBF356ka3X-LiC0PJA4Jh823Q97XSFx6PQMWy-W18MUSozDRy5tjZUVAYAiA_-Vm8W3fmwQ5V3TGBiMaaT6SD6CSiRIu_kXWm6yCcEhiewC_FTqqYhVh17HAv7HuaEkKVgffga3MEJDwKLOeyOTalY8HUAsvKzvxBnbVs30rWW6w0r4wL0_cn5ZDFHuWBWUxFhy3AtCwnqbKBLn9u7fpwEvdpq6ksBV-51rqOi0MSlsTxSoNLAjUrgFaBrVW2ZqwL97nFGot9Tjdw'
      ]
    }
  ]);

  const handleClearFilters = () => {
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      progress: 0,
      status: 'in_progress', // Enforce task directly lands inside in_progress lane
      category: newCategory,
      dueDate: newDueDate,
      comments: 0,
      attachments: 0,
      assignees: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCf_adT4WqUN-Sv-ma_hbIhZx82TRXTvwVuaggZJKYwvvxaD1kZv2ajaOEmiIhee2n4F8Nlstr-WSl0buPg6Cy7k-y6qMhMxPyPebx2vN7n_MQ0Esn9E1zNXBfbPxDoRTtcag8YKhGYXRxn0LF5gy04w7JnyeC5c4_OokYaigCgbSxzQVwuHkPok2vvIGBzl03QE8LEM7wZpGX5R4uNEHICj3fk6rVuFJ6A8dSrC04TUdLEGmfZqjadzyM52NQyuh9TvYWr-r85Ug'
      ]
    };
    setTasks(prev => [...prev, newTask]);
    // Reset modal input parameters
    setNewTitle('');
    setNewDesc('');
    setNewPriority('Medium');
    setNewCategory('');
    setNewDueDate('');
    setIsAddModalOpen(false);
  };

  // Perform multi-criteria filter computation
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const activeTasksCount = filteredTasks.filter(t => t.status !== 'completed').length;

  return (
    <div className="flex flex-col h-full animate-fade-in relative z-10 pb-10">
      
      {/* 1. Header with View Toggle & Task Create controls */}
      <TasksHeader 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddTaskClick={() => setIsAddModalOpen(true)}
      />

      {/* Sleek Glassmorphic Status Sub-Tabs */}
      <div className="flex border-b border-white/5 pb-2 mb-6 gap-2 w-full mt-4 select-none">
        {[
          { id: 'in_progress', label: 'In Progress', dotColor: 'bg-[#EF2F29] animate-pulse', count: tasks.filter(t => t.status === 'in_progress').length },
          { id: 'review', label: 'In Review', dotColor: 'bg-[#ff6b66]', count: tasks.filter(t => t.status === 'review').length },
          { id: 'completed', label: 'Completed', dotColor: 'bg-green-400', count: tasks.filter(t => t.status === 'completed').length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveStatusTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-sans font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border ${
              activeStatusTab === tab.id
                ? 'bg-white/5 border-white/10 text-white shadow-inner shadow-black/40'
                : 'border-transparent text-[#c7c4d7]/50 hover:text-[#c7c4d7]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />
            {tab.label}
            <span className="px-1.5 py-0.5 bg-white/5 text-[9px] rounded-full text-white/50">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* 2. Filters selection bar */}
      <FiltersBar 
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        activeCount={activeTasksCount}
        onClearAll={handleClearFilters}
      />

      {/* 3. Board content pane */}
      <div className="flex-1 min-h-[50vh] flex flex-col pt-4">
        <KanbanBoard 
          viewMode={viewMode}
          tasks={filteredTasks}
          setTasks={setTasks}
          activeStatusTab={activeStatusTab}
        />
      </div>

      {/* 4. Creative AI Synergy telemetry footer */}
      <TasksFooter 
        activeCount={activeTasksCount} 
        tasksCount={filteredTasks.length}
      />

      {/* 5. Modern Glassmorphic Create Task Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
          <div 
            className="w-full max-w-lg glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            style={{
              background: 'rgba(5, 5, 5, 0.95)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EF2F29] to-transparent" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Create Task Node</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 flex items-center justify-center text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddTaskSubmit} className="flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Task Title</label>
                <input 
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sync Quantum Database Nodes"
                  className="w-full bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Description</label>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Define task parameters and core telemetry instructions..."
                  className="w-full h-24 bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#030303]/60 border border-white/10 rounded-xl px-3 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none text-[#c7c4d7] cursor-pointer"
                  >
                    <option value="Low">Low Glow</option>
                    <option value="Medium">Medium Pulse</option>
                    <option value="High">High Crimson Alert</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Category</label>
                  <input 
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Synaptic Core"
                    className="w-full bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Due Date</label>
                <input 
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Oct 28"
                  className="w-full bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full mt-2 py-4 bg-gradient-to-r from-[#EF2F29] to-[#ff6b66] text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider hover:scale-102 active:scale-98 cursor-pointer shadow-lg shadow-[#EF2F29]/15 transition-all"
              >
                Initialize Node Task
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
