import express from 'express';
import {getMe} from '../../controllers/User/getUser.controller.js';
import { authMiddleware } from '../../middleware/Auth/Auth.middleware.js';

const router = express.Router();

router.get("/me" , authMiddleware , getMe);

export default router;