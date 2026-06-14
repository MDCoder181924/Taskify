import { useState, useEffect } from 'react';
import { useUser } from '../../../../context/UserContext';
import api from '../../../../api/axios';
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
  const [receivedTasks, setReceivedTasks] = useState([]);
  const [sentTasks, setSentTasks] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
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

  // Sync simulated user header with axios instance
  useEffect(() => {
    if (simulatedUser) {
      api.defaults.headers.common['x-simulated-user'] = simulatedUser;
      fetchData();
    } else {
      delete api.defaults.headers.common['x-simulated-user'];
    }
  }, [simulatedUser]);

  // Keep simulatedUser updated if logged-in user changes
  useEffect(() => {
    if (user?.email) {
      setSimulatedUser(user.email);
    }
  }, [user]);

  // Fetch all collaboration workspace data from Express backend
  const fetchData = async () => {
    try {
      const [projRes, recTasksRes, sentTasksRes, usersRes] = await Promise.all([
        api.get('/user/collaboration/projects'),
        api.get('/user/collaboration/tasks/received'),
        api.get('/user/collaboration/tasks/sent'),
        api.get('/user/collaboration/users')
      ]);

      if (projRes.data.success) {
        const formattedProjects = projRes.data.projects.map(p => ({
          id: p._id,
          name: p.name,
          creator: p.creator?.userEmail || p.creator,
          members: p.members.map(m => m.userEmail || m)
        }));
        setProjects(formattedProjects);
      }

      if (recTasksRes.data.success) {
        const formattedRec = recTasksRes.data.tasks.map(t => ({
          id: t._id,
          projectId: t.projectId?._id || t.projectId,
          projectName: t.projectId?.name || t.projectName || 'Project Workspace',
          title: t.title,
          description: t.description,
          assigner: t.assigner?.userEmail || t.assigner,
          assignee: t.assignee?.userEmail || t.assignee,
          priority: t.priority,
          dueDate: t.dueDate ? t.dueDate.split('T')[0] : '',
          status: t.status
        }));
        setReceivedTasks(formattedRec);
      }

      if (sentTasksRes.data.success) {
        const formattedSent = sentTasksRes.data.tasks.map(t => ({
          id: t._id,
          projectId: t.projectId?._id || t.projectId,
          projectName: t.projectId?.name || t.projectName || 'Project Workspace',
          title: t.title,
          description: t.description,
          assigner: t.assigner?.userEmail || t.assigner,
          assignee: t.assignee?.userEmail || t.assignee,
          priority: t.priority,
          dueDate: t.dueDate ? t.dueDate.split('T')[0] : '',
          status: t.status
        }));
        setSentTasks(formattedSent);
      }

      if (usersRes.data.success) {
        setRegisteredUsers(usersRes.data.users);
      }
    } catch (error) {
      console.error('Failed to sync details with server', error);
      toast.error('Failed to synchronize collaboration details');
    }
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

  // Handle Project Creation (DB Persisted)
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const name = projectName.trim();
    if (!name) {
      toast.error('Project Name is required');
      return;
    }

    try {
      const res = await api.post('/user/collaboration/projects', {
        name,
        members: projectMembers
      });

      if (res.data.success) {
        toast.success(`Project "${name}" launched successfully!`);
        setProjectName('');
        setProjectMembers([]);
        setSelectedProjectId(res.data.project._id);
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to launch project');
    }
  };

  // Handle Task Assignment (DB Persisted)
  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      toast.error('Please select a project first');
      return;
    }

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

    try {
      const res = await api.post('/user/collaboration/tasks', {
        projectId: selectedProjectId,
        title,
        description: desc,
        assigneeEmail: taskAssignee,
        priority: taskPriority,
        dueDate: taskDueDate || undefined
      });

      if (res.data.success) {
        toast.success(`Task assigned to ${taskAssignee}!`, { icon: '🚀' });
        setTaskTitle('');
        setTaskDesc('');
        setTaskAssignee('');
        setTaskPriority('Medium');
        setTaskDueDate('');
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to assign task');
    }
  };

  // Complete received task
  const handleCompleteTask = async (taskId) => {
    try {
      const res = await api.patch(`/user/collaboration/tasks/${taskId}/status`, {
        status: 'Completed'
      });
      if (res.data.success) {
        toast.success('Task marked as Completed!', { icon: '✅' });
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete task');
    }
  };

  // Reject received task
  const handleRejectTask = async (taskId) => {
    try {
      const res = await api.patch(`/user/collaboration/tasks/${taskId}/status`, {
        status: 'Rejected'
      });
      if (res.data.success) {
        toast.error('Task rejected', { icon: '❌' });
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reject task');
    }
  };

  // Delete/Cancel Task
  const handleDeleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/user/collaboration/tasks/${taskId}`);
      if (res.data.success) {
        toast.success('Task retracted');
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to retract task');
    }
  };

  // Merge database users with fallback emails for identity switcher dropdown
  const allKnownUsers = Array.from(new Set([
    primaryUserEmail,
    ...registeredUsers.map(u => u.userEmail),
    ...projects.flatMap(p => p.members),
    ...receivedTasks.flatMap(t => [t.assigner, t.assignee]),
    ...sentTasks.flatMap(t => [t.assigner, t.assignee])
  ])).filter(Boolean);

  const activeProject = projects.find(p => p.id === selectedProjectId);

  // Metrics calculations
  const userProjectsCount = projects.length;
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
