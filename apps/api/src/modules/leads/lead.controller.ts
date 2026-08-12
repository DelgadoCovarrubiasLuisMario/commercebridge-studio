import { Lead } from '../../models/index.js';
import { ApiError } from '../../middleware/errorHandler.js';
import { requireAdminKey } from '../../middleware/adminKey.js';
import { leadSchema, updateLeadStatusSchema } from '../../schemas/lead.schema.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const listLeads = [
  requireAdminKey,
  asyncHandler(async (_req, res) => {
    const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ data: leads });
  })
];

export const createLead = asyncHandler(async (req, res) => {
  const payload = leadSchema.parse(req.body);
  const lead = await Lead.create(payload);
  res.status(201).json({ data: lead });
});

export const updateLeadStatus = [
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) throw new ApiError(404, 'Lead not found');

    const payload = updateLeadStatusSchema.parse(req.body);
    await lead.update(payload);
    res.json({ data: lead });
  })
];
