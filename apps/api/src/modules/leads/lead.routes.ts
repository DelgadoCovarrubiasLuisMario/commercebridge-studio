import { Router } from 'express';
import { createLead, listLeads, updateLeadStatus } from './lead.controller.js';

export const leadRouter = Router();

leadRouter.get('/', listLeads);
leadRouter.post('/', createLead);
leadRouter.patch('/:id/status', updateLeadStatus);
