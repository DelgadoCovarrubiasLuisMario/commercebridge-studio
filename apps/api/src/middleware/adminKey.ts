import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';

export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-admin-key');

  if (!apiKey || apiKey !== env.ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Missing or invalid admin API key' });
  }

  return next();
}
