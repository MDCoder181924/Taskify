import mongoose from 'mongoose';
import User from '../../models/Auth/userAuth.models.js';
import Project from '../../models/Collaboration/Project.model.js';
import CollabTask from '../../models/Collaboration/CollabTask.model.js';

// 1. Create a Project
export const createProject = async (req, res) => {
  try {
    const { name, members } = req.body;
    const creatorId = req.user.userId;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Project Name is required' });
    }

    // Resolve member emails to User ObjectIds
    // Filter out the creator's email if they added it manually to avoid duplicate search
    const creatorUser = await User.findById(creatorId);
    if (!creatorUser) {
      return res.status(404).json({ success: false, message: 'Creator account not found' });
    }

    const otherEmails = (members || []).filter(email => email.trim().toLowerCase() !== creatorUser.userEmail.toLowerCase());
    
    let resolvedMemberIds = [];
    if (otherEmails.length > 0) {
      const resolvedUsers = await User.find({ userEmail: { $in: otherEmails } });
      
      if (resolvedUsers.length !== otherEmails.length) {
        const foundEmails = resolvedUsers.map(u => u.userEmail.toLowerCase());
        const missingEmails = otherEmails.filter(email => !foundEmails.includes(email.toLowerCase()));
        return res.status(400).json({ 
          success: false, 
          message: `The following email(s) are not registered users: ${missingEmails.join(', ')}` 
        });
      }
      resolvedMemberIds = resolvedUsers.map(u => u._id);
    }

    // Combine creator and resolved members, ensuring uniqueness
    const allMemberIds = Array.from(new Set([
      creatorId,
      ...resolvedMemberIds.map(id => id.toString())
    ])).map(id => new mongoose.Types.ObjectId(id));

    const newProject = new Project({
      name,
      creator: creatorId,
      members: allMemberIds
    });

    await newProject.save();

    // Populate creator and members details for the response
    const populatedProject = await Project.findById(newProject._id)
      .populate('creator', '_id userName userEmail fullName')
      .populate('members', '_id userName userEmail fullName');

    res.status(201).json({
      success: true,
      message: 'Project launched successfully',
      project: populatedProject
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Projects the User is part of
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await Project.find({ members: userId })
      .populate('creator', '_id userName userEmail fullName')
      .populate('members', '_id userName userEmail fullName');

    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Assign a Task
export const assignTask = async (req, res) => {
  try {
    const { projectId, title, description, assigneeEmail, priority, dueDate } = req.body;
    const assignerId = req.user.userId;

    if (!projectId || !title || !assigneeEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Project, Task Title, and Assignee Email are required' 
      });
    }

    // Verify project exists and assigner is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (!project.members.includes(assignerId)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized: You are not a member of this project space' 
      });
    }

    // Resolve assignee email to ObjectId
    const assigneeUser = await User.findOne({ userEmail: assigneeEmail.trim().toLowerCase() });
    if (!assigneeUser) {
      return res.status(404).json({ success: false, message: `Assignee email ${assigneeEmail} is not registered` });
    }

    // Verify assignee is in the project
    if (!project.members.includes(assigneeUser._id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Assignee is not a member of this project space' 
      });
    }

    const newTask = new CollabTask({
      projectId,
      title,
      description: description || '',
      assigner: assignerId,
      assignee: assigneeUser._id,
      priority: priority || 'Medium',
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    await newTask.save();

    const populatedTask = await CollabTask.findById(newTask._id)
      .populate('projectId', 'name')
      .populate('assigner', '_id userName userEmail fullName')
      .populate('assignee', '_id userName userEmail fullName');

    res.status(201).json({
      success: true,
      message: 'Task assigned successfully',
      task: populatedTask
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get Received Tasks (Inbox)
export const getReceivedTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await CollabTask.find({ assignee: userId })
      .populate('projectId', 'name')
      .populate('assigner', '_id userName userEmail fullName')
      .populate('assignee', '_id userName userEmail fullName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Get Sent Tasks (Delegated)
export const getSentTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await CollabTask.find({ assigner: userId })
      .populate('projectId', 'name')
      .populate('assigner', '_id userName userEmail fullName')
      .populate('assignee', '_id userName userEmail fullName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Update Task Status (Complete or Reject)
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    if (!['Completed', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status update' });
    }

    const task = await CollabTask.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Verify user is assignee
    if (task.assignee.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized: Only the assigned user can update this task status' 
      });
    }

    task.status = status;
    await task.save();

    const populatedTask = await CollabTask.findById(taskId)
      .populate('projectId', 'name')
      .populate('assigner', '_id userName userEmail fullName')
      .populate('assignee', '_id userName userEmail fullName');

    res.status(200).json({
      success: true,
      message: `Task marked as ${status}`,
      task: populatedTask
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Delete/Retract a Task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;

    const task = await CollabTask.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Verify user is assigner
    if (task.assigner.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized: Only the assigner can retract this task' 
      });
    }

    await CollabTask.findByIdAndDelete(taskId);

    res.status(200).json({
      success: true,
      message: 'Task retracted successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Get All Registered Users (only safe details)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'Employee' }).select('_id userName userEmail fullName');
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
