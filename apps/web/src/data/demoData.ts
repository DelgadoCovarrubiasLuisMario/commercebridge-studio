import type { Collection, Lead, Product, ThemeSetting } from '../types';

const now = new Date().toISOString();

export let demoProducts: Product[] = [
  {
    id: 1,
    title: 'Minimalist Tote Bag',
    handle: 'minimalist-tote-bag',
    description: 'Reusable cotton tote designed for daily errands and lifestyle bundles.',
    vendor: 'Northline Goods',
    productType: 'Accessories',
    price: 399,
    compareAtPrice: 499,
    inventoryQuantity: 42,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
    tags: 'bags, lifestyle, cotton',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 2,
    title: 'Ceramic Desk Set',
    handle: 'ceramic-desk-set',
    description: 'Premium ceramic organizer set for creators and modern retail gift boxes.',
    vendor: 'Atelier Casa',
    productType: 'Home Office',
    price: 799,
    compareAtPrice: null,
    inventoryQuantity: 18,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    tags: 'desk, ceramic, home',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 3,
    title: 'Cold Brew Starter Kit',
    handle: 'cold-brew-starter-kit',
    description: 'Curated cold brew kit with reusable bottle and filters.',
    vendor: 'Brew Lab',
    productType: 'Food & Beverage',
    price: 649,
    compareAtPrice: 749,
    inventoryQuantity: 7,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80',
    tags: 'coffee, kit, beverage',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 4,
    title: 'Limited Drop Hoodie',
    handle: 'limited-drop-hoodie',
    description: 'Soft heavyweight hoodie prepared as a draft for a limited launch.',
    vendor: 'Urban Motion',
    productType: 'Apparel',
    price: 1199,
    compareAtPrice: null,
    inventoryQuantity: 0,
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80',
    tags: 'apparel, hoodie, drop',
    createdAt: now,
    updatedAt: now
  }
];

export const demoCollections: Collection[] = [
  {
    id: 1,
    title: 'Launch Essentials',
    handle: 'launch-essentials',
    description: 'Products prepared for a first campaign launch.',
    heroImageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 2,
    title: 'Lifestyle Catalog',
    handle: 'lifestyle-catalog',
    description: 'A flexible collection for small brands that need a polished storefront preview.',
    heroImageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false
  }
];

export let demoLeads: Lead[] = [
  {
    id: 1,
    fullName: 'Mariana Torres',
    email: 'mariana@example.com',
    company: 'Casa Luma',
    message: 'We need catalog adaptations and campaign forms for the season.',
    budget: '$15,000 - $25,000 MXN',
    status: 'contacted',
    createdAt: now
  },
  {
    id: 2,
    fullName: 'Diego Salazar',
    email: 'diego@example.com',
    company: 'Brew Lab',
    message: 'We want a stronger product page and quotes connected to our database.',
    budget: '$25,000+ MXN',
    status: 'new',
    createdAt: now
  }
];

export let demoTheme: ThemeSetting = {
  id: 1,
  storeName: 'Northline Goods',
  announcement: 'Free local delivery on launch bundles',
  heroTitle: 'Launch-ready storefronts for modern brands',
  heroSubtitle: 'Preview products, forms and Liquid-style sections before publishing storefront changes.',
  primaryColor: '#111827',
  accentColor: '#f97316'
};

export function renderDemoTemplate(template: string, productId?: number) {
  const product = demoProducts.find((item) => item.id === productId) ?? demoProducts[0];
  const html = template
    .split('{{ product.title }}').join(product?.title ?? 'Sample product')
    .split('{{ product.price }}').join(String(product?.price ?? 0))
    .split('{{ shop.name }}').join(demoTheme.storeName)
    .split('{{ theme.announcement }}').join(demoTheme.announcement);

  return `<div style="font-family:Georgia,serif;padding:24px;background:#fff;color:#111">${html || `<h1>${demoTheme.heroTitle}</h1><p>${product?.title ?? ''}</p>`}</div>`;
}
