import express from 'express';
import { authMiddleware } from '../../middleware/Auth/Auth.middleware.js';
import {
  createProject,
  getProjects,
  assignTask,
  getReceivedTasks,
  getSentTasks,
  updateTaskStatus,
  deleteTask,
  getAllUsers
} from '../../controllers/Collaboration/collaboration.controller.js';

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Project Endpoints
router.post('/projects', createProject);
router.get('/projects', getProjects);

// Task Endpoints
router.post('/tasks', assignTask);
router.get('/tasks/received', getReceivedTasks);
router.get('/tasks/sent', getSentTasks);
router.patch('/tasks/:taskId/status', updateTaskStatus);
router.delete('/tasks/:taskId', deleteTask);

// User List Endpoint (Autocomplete & Switcher)
router.get('/users', getAllUsers);

export default router;
