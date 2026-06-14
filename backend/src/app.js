import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from "helmet"
import cors from 'cors'

import userRoutes from './routes/Auth/user.route.js';
import adminRoutes from './routes/Auth/admin.route.js';
import passport from './config/passport.js'
import userTaskRoutes from './routes/User/tasks.router.js';
import userRouter from './routes/User/user.router.js';
import collaborationRouter from './routes/Collaboration/collaboration.route.js';

const app = express();
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL?.replace(/\/+$/, ''),
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth/user' , userRoutes);
app.use('/auth/admin' , adminRoutes);

app.use('/user/task' , userTaskRoutes);
app.use('/user' , userRouter);
app.use('/user/collaboration', collaborationRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Taskify API");
});

export default app;