import { Plus, X, FolderPlus, Users, Shield, Award, Sparkles } from 'lucide-react';

export default function ProjectLaunchpad({
  projectName,
  setProjectName,
  memberEmailInput,
  setMemberEmailInput,
  projectMembers,
  handleAddMember,
  handleRemoveMember,
  handleCreateProject,
  projects,
  simulatedUser,
  selectedProjectId,
  setSelectedProjectId,
  setTaskAssignee,
  primaryUserEmail
}) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">

      {/* Create Project Panel */}
      <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-tr from-[#EF2F29] to-[#ff6b4a] rounded-xl text-white">
            <FolderPlus className="w-5 h-5" />
          </div>
          <h2 className="font-display font-extrabold text-lg text-white">Launch Team Project</h2>
        </div>

        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Project Title
            </label>
            <input
              type="text"
              placeholder="e.g. Android App, Website V2..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-white/10 transition-all font-sans"
            />
          </div>

          {/* Members Adding Sub-Form */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-white/50 mb-1.5 tracking-wider">
              Add Collaborator Email
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="teammate@domain.com"
                value={memberEmailInput}
                onChange={(e) => setMemberEmailInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddMember(e);
                  }
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffa940]/60 focus:bg-white/10 transition-all font-sans"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-xl px-4 flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Team Roster Badges */}
            {projectMembers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                {projectMembers.map((email) => (
                  <span 
                    key={email} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#EF2F29]/10 to-[#ff6b4a]/10 border border-[#ff6b4a]/30 text-white rounded-lg text-xs font-semibold animate-fade-in"
                  >
                    <span className="truncate max-w-[140px]">{email}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveMember(email)}
                      className="hover:text-red-400 transition-colors p-0.5 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!projectName.trim()}
            className={`w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all select-none duration-300 border border-white/10 flex items-center justify-center gap-2 cursor-pointer ${
              projectName.trim()
                ? 'bg-gradient-to-r from-[#EF2F29] to-[#ff6b4a] hover:from-[#EF2F29] hover:to-[#ff5c36] text-white hover:scale-[1.01] active:scale-99 shadow-lg shadow-red-500/10'
                : 'bg-white/5 text-white/30 cursor-not-allowed border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Initialize Workspace</span>
          </button>
        </form>
      </div>

      {/* Active Projects List */}
      <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20 flex-1 flex flex-col min-h-[350px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#ffa940]/10 rounded-xl text-[#ffa940]">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-display font-extrabold text-lg text-white">Active Projects</h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#ffa940]/10 text-[#ffa940] px-2.5 py-1 rounded-full uppercase tracking-wider">
            {projects.filter(p => p.members.includes(simulatedUser)).length} Spaces
          </span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 max-h-[400px]">
          {projects.filter(p => p.members.includes(simulatedUser)).length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl">
              <Users className="w-8 h-8 text-white/20 mb-3" />
              <p className="text-white/50 text-xs font-semibold">No project spaces found.</p>
              <p className="text-white/30 text-[10px] mt-1 leading-relaxed max-w-[200px]">Create a project space to begin assigning collaborative milestones.</p>
            </div>
          ) : (
            projects.filter(p => p.members.includes(simulatedUser)).map((project) => {
              const isSelected = selectedProjectId === project.id;
              const isCreator = project.creator === simulatedUser;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setTaskAssignee('');
                  }}
                  className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-3 ${
                    isSelected 
                      ? 'bg-[#b21b16]/10 border-[#ffa940]/50 shadow-md shadow-red-900/10' 
                      : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/8'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#ffa940] transition-colors">
                        {project.name}
                      </h4>
                      <span className="text-[9px] font-mono font-semibold text-white/40 block mt-1">
                        ID: {project.id} • Creator: {isCreator ? 'You' : project.creator}
                      </span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isCreator 
                        ? 'bg-gradient-to-tr from-[#EF2F29]/20 to-[#ff6b4a]/20 border border-[#ff6b4a]/30 text-white' 
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}>
                      {isCreator ? 'Owner' : 'Member'}
                    </span>
                  </div>

                  {/* Display roster if selected */}
                  {isSelected && (
                    <div className="pt-2 border-t border-white/10 mt-1 animate-slide-down">
                      <p className="text-[9px] font-mono font-bold uppercase text-white/40 mb-1.5 tracking-wider">
                        Project Members ({project.members.length})
                      </p>
                      <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto">
                        {project.members.map(memberEmail => (
                          <div key={memberEmail} className="flex justify-between items-center bg-[#0d0d0d]/40 rounded-lg py-1.5 px-2.5 text-xs text-white/70 border border-white/5">
                            <span className="truncate max-w-[190px] font-mono leading-none">{memberEmail === primaryUserEmail ? `${memberEmail} (You)` : memberEmail}</span>
                            {project.creator === memberEmail ? (
                              <Shield className="w-3.5 h-3.5 text-[#ffa940] shrink-0" title="Project Owner" />
                            ) : (
                              <Award className="w-3.5 h-3.5 text-white/20 shrink-0" title="Project Colleague" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
