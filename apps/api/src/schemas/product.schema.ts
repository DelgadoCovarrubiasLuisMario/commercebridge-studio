import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(10),
  vendor: z.string().min(2).max(100),
  productType: z.string().min(2).max(100),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().positive().nullable().optional(),
  inventoryQuantity: z.coerce.number().int().min(0),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  imageUrl: z.string().url(),
  tags: z.string().max(300).default('')
});

export const updateProductSchema = productSchema.partial();
