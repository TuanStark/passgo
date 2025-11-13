import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  cityId?: string;
  isFeatured: boolean;
  displayOrder: number;
  restaurants?: Array<{
    id: string;
    name: string;
    slug: string;
    image?: string;
    rating: number;
    reviewCount: number;
  }>;
}

export const collectionsService = {
  async getAll(cityId?: string): Promise<Collection[]> {
    return apiClient.get<Collection[]>(API_ENDPOINTS.COLLECTIONS.BASE, {
      cityId,
    });
  },

  async getById(id: string): Promise<Collection> {
    return apiClient.get<Collection>(API_ENDPOINTS.COLLECTIONS.BY_ID(id));
  },

  async getBySlug(slug: string): Promise<Collection> {
    return apiClient.get<Collection>(API_ENDPOINTS.COLLECTIONS.BY_SLUG(slug));
  },
};

