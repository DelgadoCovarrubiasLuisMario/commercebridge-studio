export type ProductStatus = 'draft' | 'active' | 'archived';
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export interface Product {
  id: number;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  price: number;
  compareAtPrice: number | null;
  inventoryQuantity: number;
  status: ProductStatus;
  imageUrl: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: number;
  title: string;
  handle: string;
  description: string;
  heroImageUrl: string;
  isFeatured: boolean;
}

export interface Lead {
  id: number;
  fullName: string;
  email: string;
  company: string | null;
  message: string;
  budget: string;
  status: LeadStatus;
  createdAt: string;
}

export interface ThemeSetting {
  id: number;
  storeName: string;
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
}

export interface ApiResponse<T> {
  data: T;
}
