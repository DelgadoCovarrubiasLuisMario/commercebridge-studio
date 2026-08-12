import type { ApiResponse, Collection, Lead, LeadStatus, Product, ProductStatus, ThemeSetting } from '../types';
import {
  demoCollections,
  demoLeads,
  demoProducts,
  demoTheme,
  renderDemoTemplate
} from '../data/demoData';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4100/api';
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY ?? 'change-this-demo-key';
const useDemo = import.meta.env.VITE_USE_DEMO === 'true';

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
    if (useDemo) {
      const query = search.trim().toLowerCase();
      return query
        ? demoProducts.filter((product) => `${product.title} ${product.vendor} ${product.tags}`.toLowerCase().includes(query))
        : demoProducts;
    }
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
    if (useDemo) {
      const created: Product = {
        id: Date.now(),
        handle: payload.title.toLowerCase().replace(/\s+/g, '-'),
        compareAtPrice: payload.compareAtPrice ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload
      };
      demoProducts.unshift(created);
      return created;
    }
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
    if (useDemo) {
      const target = demoProducts.find((item) => item.id === id);
      if (!target) throw new Error('Product not found');
      Object.assign(target, payload, { updatedAt: new Date().toISOString() });
      return target;
    }
    const result = await request<ApiResponse<Product>>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async leads() {
    if (useDemo) return demoLeads;
    const result = await request<ApiResponse<Lead[]>>('/leads');
    return result.data;
  },

  async createLead(payload: Pick<Lead, 'fullName' | 'email' | 'company' | 'message' | 'budget'>) {
    if (useDemo) {
      const created: Lead = {
        id: Date.now(),
        ...payload,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      demoLeads.unshift(created);
      return created;
    }
    const result = await request<ApiResponse<Lead>>('/leads', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async updateLeadStatus(id: number, status: LeadStatus) {
    if (useDemo) {
      const target = demoLeads.find((item) => item.id === id);
      if (!target) throw new Error('Lead not found');
      target.status = status;
      return target;
    }
    const result = await request<ApiResponse<Lead>>(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return result.data;
  },

  async collections() {
    if (useDemo) return demoCollections;
    const result = await request<ApiResponse<Collection[]>>('/collections');
    return result.data;
  },

  async theme() {
    if (useDemo) return demoTheme;
    const result = await request<ApiResponse<ThemeSetting | null>>('/theme');
    return result.data;
  },

  async updateTheme(payload: Omit<ThemeSetting, 'id'>) {
    if (useDemo) {
      Object.assign(demoTheme, payload);
      return demoTheme;
    }
    const result = await request<ApiResponse<ThemeSetting>>('/theme', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return result.data;
  },

  async renderTemplate(template: string, productId?: number) {
    if (useDemo) return renderDemoTemplate(template, productId);
    const result = await request<ApiResponse<{ html: string }>>('/theme/render', {
      method: 'POST',
      body: JSON.stringify({ template, productId })
    });
    return result.data.html;
  }
};

export type { ProductStatus };
