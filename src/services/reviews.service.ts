import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface CreateReviewDto {
  restaurantId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  foodRating?: number;
  serviceRating?: number;
  ambianceRating?: number;
}

export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  foodRating?: number;
  serviceRating?: number;
  ambianceRating?: number;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  images?: Array<{
    id: string;
    imageUrl: string;
  }>;
}

export const reviewsService = {
  async create(data: CreateReviewDto): Promise<Review> {
    return apiClient.post<Review>(API_ENDPOINTS.REVIEWS.BASE, data);
  },

  async getAll(restaurantId?: string, page?: number, limit?: number): Promise<Review[]> {
    return apiClient.get<Review[]>(API_ENDPOINTS.REVIEWS.BASE, {
      restaurantId,
      page,
      limit,
    });
  },

  async getById(id: string): Promise<Review> {
    return apiClient.get<Review>(API_ENDPOINTS.REVIEWS.BY_ID(id));
  },
};

