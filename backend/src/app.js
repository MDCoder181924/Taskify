import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from "helmet"
import cors from 'cors'

import userRoutes from './routes/Auth/user.route.js';
import adminRoutes from './routes/Auth/admin.route.js';
import passport from './config/passport.js'

const app = express();
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth/user' , userRoutes);
app.use('/auth/admin' , adminRoutes);

export default app;