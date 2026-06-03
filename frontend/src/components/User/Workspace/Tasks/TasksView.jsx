import { useState , useEffect } from 'react';
import TasksHeader from './TasksHeader';
import FiltersBar from './FiltersBar';
import KanbanBoard from './KanbanBoard';
import TasksFooter from './TasksFooter';
import api from "../../../../api/axios";
import { useTask } from '../../../../context/TaskContext';

export default function TasksView() {
  const { tasks, setTasks , fetchTasks} = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleClearFilters = () => {
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  const complitTask = async (taskId) =>{
    try{
       await api.post("/user/task/completeTask",{
        taskId
      })
      await fetchTasks();
    }catch(error){
      console.error("Error completing task:", error);
    }
  }

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post("/user/task/addTask",{
        taskTitle: newTitle,
        taskDescription: newDesc,
        taskPriority: newPriority,
        taskCategory: newCategory,
        taskDueDate: newDueDate
      })
      await fetchTasks();
    }
    catch(error){
      console.error("Error adding task:", error);
    }
    setNewTitle('');
    setNewDesc('');
    setNewPriority('Medium');
    setNewCategory('');
    setNewDueDate('');
    setIsAddModalOpen(false);
  };

  // Perform multi-criteria filter computation
  const filteredTasks = tasks.map(task => ({
    id: task._id,
    title: task.taskTitle,
    description: task.taskDescription,
    priority: task.taskPriority,
    category: task.taskCategory,
    dueDate: task.taskDueDate,
    status: task.taskStatus === 'completed' ? 'completed' : task.taskStatus === 'in_progress' ? 'in_progress' : 'in_progress',
    progress: task.taskStatus === 'Completed' ? 100 : 45,
    assignees: [],
  })).filter(task => {
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
          { id: 'in_progress', label: 'In Progress', dotColor: 'bg-[#EF2F29] animate-pulse', count: filteredTasks.filter(t => t.status === 'in_progress').length },
          { id: 'review', label: 'In Review', dotColor: 'bg-[#ff6b66]', count: filteredTasks.filter(t => t.status === 'review').length },
          { id: 'completed', label: 'Completed', dotColor: 'bg-green-400', count: filteredTasks.filter(t => t.status === 'completed').length }
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
          onCompleteTask={complitTask}
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
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onFocus={(e) => e.target.showPicker?.()}
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
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
