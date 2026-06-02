import express from 'express';
import getUser from '../../controllers/User/getUser.controller.js';
import { authMiddleware } from '../../middleware/Auth/Auth.middleware.js';

const router = express.Router();

router.get("/me" , authMiddleware , getUser);

export default router;