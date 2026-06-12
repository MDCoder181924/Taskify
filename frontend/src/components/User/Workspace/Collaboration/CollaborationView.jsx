import { useState, useEffect } from 'react';
import { useUser } from '../../../../context/UserContext';
import toast from 'react-hot-toast';

// Import subcomponents
import CollaborationHeader from './CollaborationHeader';
import CollaborationStats from './CollaborationStats';
import ProjectLaunchpad from './ProjectLaunchpad';
import TaskDelegationForm from './TaskDelegationForm';
import ReceivedTasks from './ReceivedTasks';
import SentTasks from './SentTasks';

export default function CollaborationView() {
  const { user } = useUser();
  const primaryUserEmail = user?.email || 'admin@taskify.com';

  // Core States
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [simulatedUser, setSimulatedUser] = useState(primaryUserEmail);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  // Form States
  const [projectName, setProjectName] = useState('');
  const [memberEmailInput, setMemberEmailInput] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');

  // Load initial data or populate mock data
  useEffect(() => {
    const savedProjects = localStorage.getItem('taskify_collab_projects');
    const savedTasks = localStorage.getItem('taskify_collab_tasks');

    if (savedProjects && savedTasks) {
      setProjects(JSON.parse(savedProjects));
      setTasks(JSON.parse(savedTasks));
    } else {
      // Pre-populate with beautiful demo data
      const demoProjects = [
        {
          id: 'proj-1',
          name: 'Quantum Core Redesign',
          creator: primaryUserEmail,
          members: [primaryUserEmail, 'sophie.dev@taskify.io', 'marcus.lead@taskify.io', 'elena.qa@taskify.io']
        },
        {
          id: 'proj-2',
          name: 'Taskify Mobile App',
          creator: 'marcus.lead@taskify.io',
          members: ['marcus.lead@taskify.io', primaryUserEmail, 'sophie.dev@taskify.io']
        }
      ];

      const demoTasks = [
        {
          id: 'task-1',
          projectId: 'proj-1',
          projectName: 'Quantum Core Redesign',
          title: 'Review Database Migration Script',
          description: 'Check if the SQLite schemas map correctly to PostgreSQL and verify constraints.',
          assigner: 'marcus.lead@taskify.io',
          assignee: primaryUserEmail,
          priority: 'High',
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
          status: 'Pending'
        },
        {
          id: 'task-2',
          projectId: 'proj-1',
          projectName: 'Quantum Core Redesign',
          title: 'Optimize Landing Page Bundle Size',
          description: 'Refactor dynamic imports for heavy components and remove unused dependencies.',
          assigner: primaryUserEmail,
          assignee: 'sophie.dev@taskify.io',
          priority: 'Medium',
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
          status: 'Pending'
        },
        {
          id: 'task-3',
          projectId: 'proj-1',
          projectName: 'Quantum Core Redesign',
          title: 'Run Safari Compatibility Testing',
          description: 'Test CSS Grid layouts and flex containers on iOS 16 Safari and macOS.',
          assigner: primaryUserEmail,
          assignee: 'elena.qa@taskify.io',
          priority: 'Low',
          dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
          status: 'Completed'
        }
      ];

      setProjects(demoProjects);
      setTasks(demoTasks);
      localStorage.setItem('taskify_collab_projects', JSON.stringify(demoProjects));
      localStorage.setItem('taskify_collab_tasks', JSON.stringify(demoTasks));
    }
  }, [primaryUserEmail]);

  // Keep simulatedUser updated if logged-in user changes
  useEffect(() => {
    if (user?.email) {
      setSimulatedUser(user.email);
    }
  }, [user]);

  // Sync state to local storage helpers
  const syncProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem('taskify_collab_projects', JSON.stringify(updatedProjects));
  };

  const syncTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('taskify_collab_tasks', JSON.stringify(updatedTasks));
  };

  // Add email badge to list before creating project
  const handleAddMember = (e) => {
    e.preventDefault();
    const email = memberEmailInput.trim().toLowerCase();
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (projectMembers.includes(email)) {
      toast.error('Member email already added');
      return;
    }

    setProjectMembers([...projectMembers, email]);
    setMemberEmailInput('');
    toast.success(`${email} added to roster`);
  };

  const handleRemoveMember = (emailToRemove) => {
    setProjectMembers(projectMembers.filter(email => email !== emailToRemove));
  };

  // Handle Project Creation
  const handleCreateProject = (e) => {
    e.preventDefault();
    const name = projectName.trim();
    if (!name) {
      toast.error('Project Name is required');
      return;
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      name,
      creator: simulatedUser,
      members: Array.from(new Set([simulatedUser, ...projectMembers]))
    };

    const updatedProjects = [...projects, newProject];
    syncProjects(updatedProjects);
    
    // Reset inputs
    setProjectName('');
    setProjectMembers([]);
    setSelectedProjectId(newProject.id);

    toast.success(`Project "${name}" launched successfully!`);
  };

  // Handle Task Assignment
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      toast.error('Please select a project first');
      return;
    }
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return;

    const title = taskTitle.trim();
    const desc = taskDesc.trim();
    
    if (!title) {
      toast.error('Task title is required');
      return;
    }
    if (!taskAssignee) {
      toast.error('Please select a member to assign the task to');
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      projectId: selectedProjectId,
      projectName: project.name,
      title,
      description: desc,
      assigner: simulatedUser,
      assignee: taskAssignee,
      priority: taskPriority,
      dueDate: taskDueDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // default 3 days
      status: 'Pending'
    };

    const updatedTasks = [...tasks, newTask];
    syncTasks(updatedTasks);

    // Reset task form
    setTaskTitle('');
    setTaskDesc('');
    setTaskAssignee('');
    setTaskPriority('Medium');
    setTaskDueDate('');

    toast.success(`Task assigned to ${taskAssignee}!`, {
      icon: '🚀'
    });
  };

  // Complete received task
  const handleCompleteTask = (taskId) => {
    const updated = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'Completed' };
      }
      return task;
    });
    syncTasks(updated);
    toast.success('Task marked as Completed!', {
      icon: '✅'
    });
  };

  // Reject received task
  const handleRejectTask = (taskId) => {
    const updated = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'Rejected' };
      }
      return task;
    });
    syncTasks(updated);
    toast.error('Task rejected', {
      icon: '❌'
    });
  };

  // Delete/Cancel Task
  const handleDeleteTask = (taskId) => {
    const updated = tasks.filter(task => task.id !== taskId);
    syncTasks(updated);
    toast.success('Task retracted');
  };

  // Gather all unique users ever added to any project, plus primary user, to populate the simulation dropdown
  const allKnownUsers = Array.from(new Set([
    primaryUserEmail,
    ...projects.flatMap(p => p.members),
    ...tasks.flatMap(t => [t.assigner, t.assignee])
  ])).filter(Boolean);

  const activeProject = projects.find(p => p.id === selectedProjectId);

  // Filter tasks based on selected simulated identity
  const receivedTasks = tasks.filter(t => t.assignee === simulatedUser);
  const sentTasks = tasks.filter(t => t.assigner === simulatedUser);

  // Metrics calculations for simulated user
  const userProjectsCount = projects.filter(p => p.members.includes(simulatedUser)).length;
  const pendingReceivedCount = receivedTasks.filter(t => t.status === 'Pending').length;
  const completedReceivedCount = receivedTasks.filter(t => t.status === 'Completed').length;
  const totalSentCount = sentTasks.length;

  return (
    <div className="flex-1 flex flex-col relative z-10 animate-fade-in pb-12 px-1">
      
      <CollaborationHeader 
        simulatedUser={simulatedUser}
        setSimulatedUser={setSimulatedUser}
        allKnownUsers={allKnownUsers}
        primaryUserEmail={primaryUserEmail}
      />

      <CollaborationStats 
        userProjectsCount={userProjectsCount}
        pendingReceivedCount={pendingReceivedCount}
        completedReceivedCount={completedReceivedCount}
        totalSentCount={totalSentCount}
      />

      {/* Main Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Setup and Active Spaces */}
        <ProjectLaunchpad 
          projectName={projectName}
          setProjectName={setProjectName}
          memberEmailInput={memberEmailInput}
          setMemberEmailInput={setMemberEmailInput}
          projectMembers={projectMembers}
          handleAddMember={handleAddMember}
          handleRemoveMember={handleRemoveMember}
          handleCreateProject={handleCreateProject}
          projects={projects}
          simulatedUser={simulatedUser}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          setTaskAssignee={setTaskAssignee}
          primaryUserEmail={primaryUserEmail}
        />

        {/* Right Column: Tasks Assignment Forms & List Boards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <TaskDelegationForm 
            activeProject={activeProject}
            simulatedUser={simulatedUser}
            taskAssignee={taskAssignee}
            setTaskAssignee={setTaskAssignee}
            taskDueDate={taskDueDate}
            setTaskDueDate={setTaskDueDate}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDesc={taskDesc}
            setTaskDesc={setTaskDesc}
            taskPriority={taskPriority}
            setTaskPriority={setTaskPriority}
            handleAssignTask={handleAssignTask}
          />

          <ReceivedTasks 
            receivedTasks={receivedTasks}
            handleCompleteTask={handleCompleteTask}
            handleRejectTask={handleRejectTask}
          />

          <SentTasks 
            sentTasks={sentTasks}
            handleDeleteTask={handleDeleteTask}
          />
        </div>

      </div>

    </div>
  );
}
