import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import { errorHandler, defaultErrorHandler } from '@utils/middleware';
import { markers } from './controllers';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

// Routes
const routes = Router();
routes.use('/markers', markers);

app.use('/api', routes);
app.use(errorHandler);
app.use(defaultErrorHandler);

app.set('port', process.env.PORT || 3102);
