import express from 'express';
import {getMe , getUserCount} from '../../controllers/User/getUser.controller.js';
import { authMiddleware } from '../../middleware/Auth/Auth.middleware.js';

const router = express.Router();

router.get("/me" , authMiddleware , getMe);
router.get("/count" ,  getUserCount);

export default router;