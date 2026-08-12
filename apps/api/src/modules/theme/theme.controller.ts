import { ThemeSetting } from '../../models/index.js';
import { requireAdminKey } from '../../middleware/adminKey.js';
import { renderTemplateSchema, themeSchema } from '../../schemas/theme.schema.js';
import { renderProductTemplate } from '../../services/liquidRenderer.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const getTheme = asyncHandler(async (_req, res) => {
  const theme = await ThemeSetting.findOne({ order: [['id', 'ASC']] });
  res.json({ data: theme });
});

export const updateTheme = [
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const payload = themeSchema.parse(req.body);
    const [theme] = await ThemeSetting.findOrCreate({
      where: { id: 1 },
      defaults: payload
    });

    await theme.update(payload);
    res.json({ data: theme });
  })
];

export const renderThemeTemplate = [
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const payload = renderTemplateSchema.parse(req.body);
    const html = await renderProductTemplate(payload.template, payload.productId);
    res.json({ data: { html } });
  })
];
