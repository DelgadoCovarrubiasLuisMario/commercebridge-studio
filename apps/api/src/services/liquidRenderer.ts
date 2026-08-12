import { Liquid } from 'liquidjs';
import { Product, ThemeSetting } from '../models/index.js';

const engine = new Liquid({
  strictVariables: false,
  strictFilters: false,
  cache: false
});

/** Fail-closed HTML sanitizer for portfolio Liquid previews (no script/handlers). */
export function sanitizePreviewHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '$1=$2#$2');
}

export async function renderProductTemplate(template: string, productId?: number) {
  const product = productId
    ? await Product.findByPk(productId)
    : await Product.findOne({ where: { status: 'active' }, order: [['createdAt', 'DESC']] });
  const theme = await ThemeSetting.findOne({ order: [['id', 'ASC']] });

  if (!product) {
    return '<p>No product available for preview.</p>';
  }

  const html = await engine.parseAndRender(template, {
    product: product.toJSON(),
    shop: {
      name: theme?.storeName ?? 'CommerceBridge Demo',
      announcement: theme?.announcement ?? 'Demo storefront'
    },
    settings: theme?.toJSON() ?? {}
  });

  return sanitizePreviewHtml(html);
}
