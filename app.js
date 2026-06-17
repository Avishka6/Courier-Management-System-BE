import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec  from './config/swagger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import {globalLimiter} from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();


// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use(express.json());

//GLOBAL RATE LIMITER
app.use(globalLimiter);

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;