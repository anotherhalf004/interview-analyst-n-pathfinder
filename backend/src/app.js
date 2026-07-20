import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
// require auth routes
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// using all routes
app.use('/api/auth', authRouter);
app.use('/api/interview',interviewRouter);



export default app;