import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { apiLimiter, aiLimiter, authLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
// require auth routes
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';


const app = express();

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Rate limiting
app.use('/api/', apiLimiter);

// using all routes
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;