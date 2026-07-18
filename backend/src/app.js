import express from 'express';
import cookieParser from 'cookie-parser';
// require auth routes
import authRouter from './routes/auth.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// using all routes
app.use('/api/auth', authRouter);



export default app;