import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4100),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  WEB_ORIGIN: z.string().url().default('http://localhost:5174'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(3306),
  DB_NAME: z.string().default('commercebridge_db'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default(''),
  ADMIN_API_KEY: z.string().min(8).default('change-this-demo-key')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
