import { Router } from 'express';
import { requireAdminKey } from '../../middleware/adminKey.js';
import { createProduct, getProduct, listProducts, updateProduct } from './product.controller.js';

export const productRouter = Router();

productRouter.get('/', listProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', requireAdminKey, createProduct);
productRouter.patch('/:id', requireAdminKey, updateProduct);
