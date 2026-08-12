import { Router } from 'express';
import { getTheme, renderThemeTemplate, updateTheme } from './theme.controller.js';

export const themeRouter = Router();

themeRouter.get('/', getTheme);
themeRouter.put('/', updateTheme);
themeRouter.post('/render', renderThemeTemplate);
