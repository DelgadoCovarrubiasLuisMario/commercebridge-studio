import { sequelize } from '../config/database.js';
import { Collection, Lead, Product, ThemeSetting } from '../models/index.js';
import { slugify } from '../utils/slugify.js';

const productSeed = [
  {
    title: 'Minimalist Tote Bag',
    description: 'Reusable cotton tote designed for daily errands, lightweight packaging and lifestyle bundles.',
    vendor: 'Northline Goods',
    productType: 'Accessories',
    price: 399,
    compareAtPrice: 499,
    inventoryQuantity: 42,
    status: 'active' as const,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
    tags: 'bags, lifestyle, cotton'
  },
  {
    title: 'Ceramic Desk Set',
    description: 'Premium ceramic organizer set for creators, home offices and modern retail gift boxes.',
    vendor: 'Atelier Casa',
    productType: 'Home Office',
    price: 799,
    compareAtPrice: null,
    inventoryQuantity: 18,
    status: 'active' as const,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    tags: 'desk, ceramic, home'
  },
  {
    title: 'Cold Brew Starter Kit',
    description: 'Curated cold brew kit with reusable bottle, filters and a clean product page-ready story.',
    vendor: 'Brew Lab',
    productType: 'Food & Beverage',
    price: 649,
    compareAtPrice: 749,
    inventoryQuantity: 7,
    status: 'active' as const,
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80',
    tags: 'coffee, kit, beverage'
  },
  {
    title: 'Limited Drop Hoodie',
    description: 'Soft heavyweight hoodie prepared as a draft product for a future limited launch campaign.',
    vendor: 'Urban Motion',
    productType: 'Apparel',
    price: 1199,
    compareAtPrice: null,
    inventoryQuantity: 0,
    status: 'draft' as const,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80',
    tags: 'apparel, hoodie, drop'
  }
];

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  await Product.bulkCreate(productSeed.map((product) => ({ ...product, handle: slugify(product.title) })));

  await Collection.bulkCreate([
    {
      title: 'Launch Essentials',
      handle: 'launch-essentials',
      description: 'Products prepared for a first campaign launch with clean storytelling and inventory readiness.',
      heroImageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true
    },
    {
      title: 'Lifestyle Catalog',
      handle: 'lifestyle-catalog',
      description: 'A flexible collection for small brands that need a polished storefront preview.',
      heroImageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80',
      isFeatured: false
    }
  ]);

  await Lead.bulkCreate([
    {
      fullName: 'Mariana Torres',
      email: 'mariana@example.com',
      company: 'Casa Luma',
      message: 'Necesitamos adaptar el catálogo y crear formularios para campañas de temporada.',
      budget: '$15,000 - $25,000 MXN',
      status: 'contacted'
    },
    {
      fullName: 'Diego Salazar',
      email: 'diego@example.com',
      company: 'Brew Lab',
      message: 'Queremos mejorar la página de producto y conectar cotizaciones con nuestra base de datos.',
      budget: '$25,000+ MXN',
      status: 'new'
    }
  ]);

  await ThemeSetting.create({
    storeName: 'Northline Goods',
    announcement: 'Free local delivery on launch bundles',
    heroTitle: 'Launch-ready storefronts for modern brands',
    heroSubtitle: 'Preview products, forms and Liquid-style sections before publishing storefront changes.',
    primaryColor: '#111827',
    accentColor: '#f97316'
  });

  await sequelize.close();
  console.log('CommerceBridge demo data seeded successfully.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
