import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  stats?: {
    bookingsCount: number;
    reviewsCount: number;
    favoritesCount: number;
  };
}

export interface Booking {
  id: string;
  restaurantId: string;
  bookingDate: string;
  bookingTime: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  restaurant?: {
    id: string;
    name: string;
    slug: string;
    address?: string;
    city?: {
      id: string;
      name: string;
    };
    district?: {
      id: string;
      name: string;
    };
    images?: Array<{
      id: string;
      imageUrl: string;
      imageType: string;
    }>;
  };
}

export interface Favorite {
  id: string;
  restaurantId: string;
  restaurant?: {
    id: string;
    name: string;
    slug: string;
    rating: number;
    reviewCount: number;
  };
}

export const usersService = {
  async getProfile(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
  },

  async getBookings(): Promise<Booking[]> {
    return apiClient.get<Booking[]>(API_ENDPOINTS.USERS.BOOKINGS);
  },

  async getFavorites(): Promise<Favorite[]> {
    return apiClient.get<Favorite[]>(API_ENDPOINTS.USERS.FAVORITES);
  },

  async addFavorite(restaurantId: string): Promise<Favorite> {
    return apiClient.post<Favorite>(API_ENDPOINTS.USERS.ADD_FAVORITE(restaurantId));
  },

  async removeFavorite(restaurantId: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.USERS.REMOVE_FAVORITE(restaurantId));
  },

  async getById(id: string): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
  },
};

