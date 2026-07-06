import { UserPlus, Send, AlertCircle } from 'lucide-react';

export default function TaskDelegationForm({
  activeProject,
  simulatedUser,
  taskAssignee,
  setTaskAssignee,
  taskDueDate,
  setTaskDueDate,
  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,
  taskPriority,
  setTaskPriority,
  handleAssignTask
}) {
  return (
    <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-[#4cd7f6]/10 rounded-xl text-[#4cd7f6]">
          <UserPlus className="w-5 h-5" />
        </div>
        <h2 className="font-display font-extrabold text-lg text-white">Deploy Task to Team</h2>
      </div>

      {activeProject ? (
        <form onSubmit={handleAssignTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Active Project Label */}
          <div className="md:col-span-2 bg-[#b21b16]/10 border border-[#ffa940]/20 rounded-xl p-3.5 flex justify-between items-center">
            <div>
              <p className="text-[9px] font-mono font-bold uppercase text-[#ffa940] tracking-widest">Active Collaboration Space</p>
              <h4 className="text-white text-sm font-bold mt-0.5">{activeProject.name}</h4>
            </div>
            <span className="text-white/40 text-xs font-mono">{activeProject.members.length} members eligible</span>
          </div>

          {/* Assignee select */}
          <div className="md:col-span-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Select Assignee
            </label>
            <select
              value={taskAssignee}
              onChange={(e) => setTaskAssignee(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-[#0d0d0d] transition-all cursor-pointer font-sans"
            >
              <option value="" className="bg-[#0d0d0d] text-white/50">-- Choose Member --</option>
              {activeProject.members.map(memberEmail => (
                <option key={memberEmail} value={memberEmail} className="bg-[#0d0d0d] text-white">
                  {memberEmail === simulatedUser ? `${memberEmail} (Self)` : memberEmail}
                </option>
              ))}
            </select>
          </div>

          {/* Due date picker */}
          <div className="md:col-span-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Target Completion Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-[#0d0d0d] transition-all font-sans cursor-pointer"
              />
            </div>
          </div>

          {/* Task title */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Task Milestone Title
            </label>
            <input
              type="text"
              placeholder="Outline key deliverables, review requirements..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-white/10 transition-all font-sans"
            />
          </div>

          {/* Task description */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Execution Details & Instructions
            </label>
            <textarea
              placeholder="Provide specific notes, guidelines, links, or expectations..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-white/10 transition-all font-sans resize-none"
            />
          </div>

          {/* Priority Selection */}
          <div className="md:col-span-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Priority Tier
            </label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setTaskPriority(prio)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    taskPriority === prio
                      ? prio === 'High'
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : prio === 'Medium'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#4cd7f6] to-[#009bde] text-white-always hover:from-[#4cd7f6] hover:to-[#00b2ff] rounded-xl font-bold uppercase text-xs tracking-wider transition-all hover:scale-[1.01] active:scale-99 border border-white/10 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Send className="w-4 h-4" />
              <span>Deploy Task</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-xl min-h-[220px]">
          <AlertCircle className="w-8 h-8 text-white/20 mb-3" />
          <p className="text-white/50 text-xs font-semibold">Workspace selection required</p>
          <p className="text-white/30 text-[10px] mt-1 leading-relaxed max-w-[280px]">
            Select an active project from the list on the left to unlock task delegation options for its members.
          </p>
        </div>
      )}
    </div>
  );
}
