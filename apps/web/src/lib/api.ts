import type { ApiResponse, Collection, Lead, LeadStatus, Product, ProductStatus, ThemeSetting } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4100/api';
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY ?? 'change-this-demo-key';

async function request<T>(path: string, options: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': ADMIN_API_KEY,
        ...options.headers
      }
    });
  } catch {
    throw new Error(`API unavailable at ${API_URL}. Is the CommerceBridge API running?`);
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: 'Unexpected API error' }));
    throw new Error(payload.message ?? 'Unexpected API error');
  }

  return response.json() as Promise<T>;
}

export const api = {
  async products(search = '') {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const result = await request<ApiResponse<Product[]>>(`/products${params}`);
    return result.data;
  },

  async createProduct(payload: {
    title: string;
    description: string;
    vendor: string;
    productType: string;
    price: number;
    compareAtPrice?: number | null;
    inventoryQuantity: number;
    status: ProductStatus;
    imageUrl: string;
    tags: string;
  }) {
    const result = await request<ApiResponse<Product>>('/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async updateProduct(
    id: number,
    payload: Partial<{
      title: string;
      description: string;
      vendor: string;
      productType: string;
      price: number;
      compareAtPrice: number | null;
      inventoryQuantity: number;
      status: ProductStatus;
      imageUrl: string;
      tags: string;
    }>
  ) {
    const result = await request<ApiResponse<Product>>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async leads() {
    const result = await request<ApiResponse<Lead[]>>('/leads');
    return result.data;
  },

  async createLead(payload: Pick<Lead, 'fullName' | 'email' | 'company' | 'message' | 'budget'>) {
    const result = await request<ApiResponse<Lead>>('/leads', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async updateLeadStatus(id: number, status: LeadStatus) {
    const result = await request<ApiResponse<Lead>>(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return result.data;
  },

  async collections() {
    const result = await request<ApiResponse<Collection[]>>('/collections');
    return result.data;
  },

  async theme() {
    const result = await request<ApiResponse<ThemeSetting | null>>('/theme');
    return result.data;
  },

  async updateTheme(payload: Omit<ThemeSetting, 'id'>) {
    const result = await request<ApiResponse<ThemeSetting>>('/theme', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async renderTemplate(template: string, productId?: number) {
    const result = await request<ApiResponse<{ html: string }>>('/theme/render', {
      method: 'POST',
      body: JSON.stringify({ template, productId })
    });
    return result.data.html;
  }
};

export type { ProductStatus };
