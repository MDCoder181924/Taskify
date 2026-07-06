import express from "express";
import { chatWithAssistant } from "../../controllers/User/assistant.controller.js";
import { authMiddleware } from "../../middleware/Auth/Auth.middleware.js";

const router = express.Router();

// AI Assistant chat route (authenticated)
router.post("/chat", authMiddleware, chatWithAssistant);

export default router;
