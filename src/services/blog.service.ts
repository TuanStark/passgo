import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  cityId?: string;
  views: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  category?: BlogCategory;
  city?: {
    id: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export const blogService = {
  async getCategories(): Promise<BlogCategory[]> {
    return apiClient.get<BlogCategory[]>(API_ENDPOINTS.BLOG.CATEGORIES);
  },

  async getMostViewed(limit: number = 6): Promise<BlogPost[]> {
    return apiClient.get<BlogPost[]>(API_ENDPOINTS.BLOG.MOST_VIEWED, {
      limit,
    });
  },

  async getAll(params?: {
    categoryId?: string;
    cityId?: string;
    page?: number;
    limit?: number;
  }): Promise<BlogPost[]> {
    const response = await apiClient.get<{ data: BlogPost[]; meta?: any } | BlogPost[]>(API_ENDPOINTS.BLOG.BASE, params);
    // Handle response structure - backend returns { data: [...], meta: {...} }
    if (Array.isArray(response)) {
      return response;
    }
    return response.data || [];
  },

  async getById(id: string): Promise<BlogPost> {
    return apiClient.get<BlogPost>(API_ENDPOINTS.BLOG.BY_ID(id));
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    return apiClient.get<BlogPost>(API_ENDPOINTS.BLOG.BY_SLUG(slug));
  },
};

