import {fetAllTasks, addTask} from "../../controllers/User/Task.controller.js";
import express from "express";

const router = express.Router();

router.post("/addTask" , addTask);
router.get("/getTasks" , fetAllTasks);

export default router;