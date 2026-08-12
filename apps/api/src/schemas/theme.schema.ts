import { z } from 'zod';

export const themeSchema = z.object({
  storeName: z.string().min(2).max(100),
  announcement: z.string().min(2).max(180),
  heroTitle: z.string().min(2).max(180),
  heroSubtitle: z.string().min(2).max(280),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/)
});

export const renderTemplateSchema = z.object({
  template: z.string().min(10).max(3000),
  productId: z.coerce.number().int().positive().optional()
});
