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
import assistantRouter from './routes/User/assistant.router.js';

const app = express();
app.use(helmet())
const allowedOrigins = [
    process.env.CLIENT_URL?.replace(/\/+$/, ''),
    'https://taskify-pi-eight.vercel.app',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.indexOf(origin) !== -1 ||
            origin.startsWith('http://localhost:') ||
            origin.startsWith('http://127.0.0.1:') ||
            origin.endsWith('.vercel.app')
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use('/user/assistant', assistantRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Taskify API");
});

export default app;