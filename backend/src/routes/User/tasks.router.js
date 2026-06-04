import {fetAllTasks, addTask , complitTask , TaskEdite} from "../../controllers/User/Task.controller.js";
import express from "express";
import { authMiddleware } from "../../middleware/Auth/Auth.middleware.js";

const router = express.Router();

router.post("/addTask" ,authMiddleware, addTask);
router.get("/getTasks" , authMiddleware, fetAllTasks);
router.post("/completeTask" , authMiddleware, complitTask);
router.put("/editTask" , authMiddleware, TaskEdite);

export default router;