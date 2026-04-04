import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/Auth/user.route.js';
import adminRoutes from './routes/Auth/admin.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth/user' , userRoutes);
app.use('/auth/admin' , adminRoutes);

export default app;