import express from "express";
import { adminLogin } from "../../controllers/Auth/adminAuth.controller.js";
import { adminRagister } from "../../controllers/Auth/adminAuth.controller.js";
import { authMiddleware } from "../../middleware/Auth/Auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.post("/register", authMiddleware, adminRagister);
adminRoutes.post("/login", adminLogin);

export default adminRoutes;
