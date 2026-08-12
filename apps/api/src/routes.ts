import { Router } from 'express';
import { productRouter } from './modules/products/product.routes.js';
import { collectionRouter } from './modules/collections/collection.routes.js';
import { leadRouter } from './modules/leads/lead.routes.js';
import { themeRouter } from './modules/theme/theme.routes.js';

export const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'commercebridge-api' });
});

router.use('/products', productRouter);
router.use('/collections', collectionRouter);
router.use('/leads', leadRouter);
router.use('/theme', themeRouter);
