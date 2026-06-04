import { useEffect, useRef, useState } from 'react';
import { Calendar, MessageSquare, Paperclip, CheckSquare, Edit, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import api from '../../../../api/axios'

export default function KanbanBoard({ viewMode, tasks, setTasks, activeStatusTab, onCompleteTask, fetchTasks }) {
  const containerRef = useRef(null);

  const [editTaskSow, setEditTaskSow] = useState(false);
  const [newTaskId, setNewTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const handleEditTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/user/task/editTask', {
        taskId: newTaskId,
        taskTitle: newTaskName,
        taskDescription: newTaskDescription,
        taskPriority: newTaskPriority,
        taskCategory: newTaskCategory,
        taskDueDate: newTaskDueDate
      })
      if (res.data.success) {
        await fetchTasks();
        setEditTaskSow(false);
      }
      else {
        alert("Failed to update task: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium': return 'bg-[#EF2F29]/10 text-[#EF2F29] border-[#EF2F29]/20';
      case 'Low': return 'bg-[#ffa8a5]/10 text-[#ffa8a5] border-[#ffa8a5]/20';
      default: return 'bg-green-400/10 text-green-400 border-green-400/20';
    }
  };

  const activeColTasks = tasks.filter(t => t.status === activeStatusTab);

  // Edit Modal — shared between list and kanban views
  const editModal = editTaskSow && (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div
        className="w-full max-w-lg glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EF2F29] to-transparent" />

        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Edit Task Node</h3>
          <button
            onClick={() => setEditTaskSow(false)}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 flex items-center justify-center text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleEditTaskSubmit} className="flex flex-col gap-5 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Task Title</label>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder={newTaskName || "e.g. Optimize Synaptic Response Algorithm"}
              className="w-full bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Description</label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder={newTaskDescription || "Define task parameters and core telemetry instructions..."}
              className="w-full h-24 bg-[#030303]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#EF2F29] focus:ring-0 outline-none transition-all placeholder-[#908fa0]/25 text-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-[#c7c4d7]/60 uppercase tracking-widest px-1">Priority</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
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
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                placeholder={newTaskCategory || "e.g. Synaptic Core"}
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
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
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
  );

  const renderCard = (task) => {
    const isCompleted = task.status === 'completed';
    return (
      <div
        key={task.id}
        className={`glass-card p-5 rounded-2xl border-t border-l border-white/10 shadow-xl group hover:-translate-y-1 transition-all duration-300 ${isCompleted ? 'opacity-70 hover:opacity-100' : ''
          }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-1.5 md:opacity-0 md:group-hover:opacity-100  transition-opacity">
            <button
              className="p-1 hover:bg-white/10 rounded text-[#c7c4d7] hover:text-white transition-colors"
              onClick={() => {
                setEditTaskSow(true);
                setNewTaskId(task.id);
                setNewTaskName(task.title);
                setNewTaskDescription(task.description);
                setNewTaskPriority(task.priority);
                setNewTaskCategory(task.category);
                setNewTaskDueDate(task.dueDate);
              }}
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h4 className={`font-bold font-display text-white mb-2 leading-tight ${isCompleted ? 'line-through decoration-white/20' : ''}`}>
          {task.title}
        </h4>
        <p className="text-xs text-[#c7c4d7] line-clamp-2 mb-4 leading-relaxed font-sans font-medium">
          {task.description}
        </p>

        {/* Dynamic progress bar */}
        {!isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#c7c4d7] mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#EF2F29] to-[#ffa8a5] shadow-[0_0_10px_rgba(239,47,41,0.5)] transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Complete Task Button */}
        {!isCompleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompleteTask(task.id);
            }}
            className="w-full mb-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-sans font-bold text-xs uppercase tracking-wider hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-green-500/5 active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            Complete Task
          </button>
        )}

        {/* Footer info section */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
          <div className="flex -space-x-1.5">
            {task.assignees.map((avatar, aIdx) => (
              <div key={aIdx} className="w-6 h-6 rounded-full border border-black overflow-hidden shadow-md">
                <img src={avatar} alt="assignee avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-green-400 bg-green-400/5 px-2 py-0.5 rounded border border-green-400/10">
              <Check className="w-3 h-3" />
              <span>Approved by AI</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-xs text-[#c7c4d7] font-mono">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#908fa0]" />
                  <span>{task.dueDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    if (activeColTasks.length === 0) {
      return (
        <>
          <div className="flex-grow flex flex-col items-center justify-center p-12 text-center select-none animate-fade-in border border-dashed border-white/5 rounded-3xl bg-[#030303]/10 min-h-[40vh]">
            <CheckSquare className="w-12 h-12 text-[#ffa8a5] opacity-30 mb-4 animate-pulse" />
            <h4 className="font-display font-extrabold text-white text-base uppercase tracking-wider">No Tasks Present</h4>
            <p className="text-xs text-[#c7c4d7]/40 max-w-xs mt-1 leading-relaxed">
              There are no task nodes initialized in this sector. Click "Create Task" to deploy one.
            </p>
          </div>
          {editModal}
        </>
      );
    }
    return (
      <>
        <div className="flex flex-col gap-4 pt-1 pb-10 select-none animate-fade-in">
          {activeColTasks.map(task => {
            const isCompleted = task.status === 'completed';
            return (
              <div
                key={task.id}
                className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#EF2F29]/30 transition-all duration-300 shadow-md shadow-black/25"
              >
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded border ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] font-mono text-[#c7c4d7]/40 uppercase tracking-widest font-bold">{task.category}</span>
                  </div>
                  <h4 className={`font-bold font-display text-white text-sm ${isCompleted ? 'line-through decoration-white/20 opacity-60' : ''}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-[#c7c4d7]/70 font-sans max-w-xl leading-relaxed">{task.description}</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c7c4d7]">
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => {
                        onCompleteTask(task.id);
                      }}
                      className="px-4 py-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500 hover:text-black text-green-400 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {editModal}
      </>
    );
  }


  if (activeColTasks.length === 0) {
    return (
      <>
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none animate-fade-in border border-dashed border-white/5 rounded-3xl bg-[#030303]/10 min-h-[40vh]">
          <CheckSquare className="w-12 h-12 text-[#ffa8a5] opacity-30 mb-4 animate-pulse" />
          <h4 className="font-display font-extrabold text-white text-base uppercase tracking-wider">No Tasks Present</h4>
          <p className="text-xs text-[#c7c4d7]/40 max-w-xs mt-1 leading-relaxed">
            There are no task nodes initialized in this sector. Click "Create Task" to deploy one.
          </p>
        </div>
        {editModal}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 pb-10 select-none animate-fade-in">
        {activeColTasks.map(renderCard)}
      </div>
      {editModal}
    </>
  );
}
