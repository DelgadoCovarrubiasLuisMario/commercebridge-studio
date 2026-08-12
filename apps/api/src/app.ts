import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { router } from './routes.js';

export const app = express();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false
  })
);

app.use('/api', router);
app.use(notFound);
app.use(errorHandler);
