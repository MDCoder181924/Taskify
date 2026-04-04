import express from "express";
import { userLogin } from "../../controllers/Auth/userAuth.controller.js";
import { userRagister } from "../../controllers/Auth/userAuth.controller.js";
import { authMiddleware } from "../../middleware/Auth/Auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", authMiddleware, userRagister);
userRoutes.post("/login", userLogin);

export default userRoutes;