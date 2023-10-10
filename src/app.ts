import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import {
  errorHandler,
  defaultErrorHandler,
  AuthErrorHandler
} from '@utils/middleware';
import { markers } from './controllers';

dotenv.config();

export const app = express();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);
app.use(checkJwt);

// Routes
const routes = Router();
routes.use('/markers', markers);

app.use('/api', routes);
app.use(errorHandler);
app.use(AuthErrorHandler);
app.use(defaultErrorHandler);

app.set('port', process.env.PORT || 3102);
