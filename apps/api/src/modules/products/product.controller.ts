import { Op } from 'sequelize';
import { Product } from '../../models/index.js';
import { productSchema, updateProductSchema } from '../../schemas/product.schema.js';
import { slugify } from '../../utils/slugify.js';
import { ApiError } from '../../middleware/errorHandler.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const listProducts = asyncHandler(async (req, res) => {
  const search = String(req.query.search ?? '').trim();
  const status = String(req.query.status ?? '').trim();

  const where = {
    ...(search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { vendor: { [Op.like]: `%${search}%` } },
            { productType: { [Op.like]: `%${search}%` } },
            { tags: { [Op.like]: `%${search}%` } }
          ]
        }
      : {}),
    ...(status && ['draft', 'active', 'archived'].includes(status) ? { status } : {})
  };

  const products = await Product.findAll({ where, order: [['updatedAt', 'DESC']] });
  res.json({ data: products });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  res.json({ data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const payload = productSchema.parse(req.body);
  const product = await Product.create({
    ...payload,
    handle: slugify(payload.title)
  });

  res.status(201).json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  const payload = updateProductSchema.parse(req.body);
  await product.update({
    ...payload,
    ...(payload.title ? { handle: slugify(payload.title) } : {})
  });

  res.json({ data: product });
});
