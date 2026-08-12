import { z } from 'zod';

export const leadSchema = z.object({
  fullName: z.string().min(3).max(120),
  email: z.string().email().max(180),
  company: z.string().max(120).nullable().optional(),
  message: z.string().min(10).max(1000),
  budget: z.string().min(2).max(80)
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'quoted', 'won', 'lost'])
});
