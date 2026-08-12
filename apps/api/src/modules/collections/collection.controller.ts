import { Collection } from '../../models/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const listCollections = asyncHandler(async (_req, res) => {
  const collections = await Collection.findAll({ order: [['isFeatured', 'DESC'], ['title', 'ASC']] });
  res.json({ data: collections });
});
