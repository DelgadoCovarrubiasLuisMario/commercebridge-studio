import { Router } from 'express';
import { listCollections } from './collection.controller.js';

export const collectionRouter = Router();

collectionRouter.get('/', listCollections);
