import express from "express";
import { userLogin ,userRagister , userLogout, refreshAccessToken } from "../../controllers/Auth/userAuth.controller.js";
import { authMiddleware } from "../../middleware/Auth/Auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", authMiddleware, userRagister);
userRoutes.post("/login", userLogin);
userRoutes.post("/logout", userLogout);
userRoutes.post("/refresh-token+", refreshAccessToken);

export default userRoutes;