import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface CreateBookingDto {
  restaurantId: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:mm
  numberOfGuests: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  userId: string;
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
    address: string;
  };
}

export const bookingsService = {
  async create(data: CreateBookingDto): Promise<Booking> {
    return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.BASE, data);
  },

  async getAll(restaurantId?: string): Promise<Booking[]> {
    return apiClient.get<Booking[]>(API_ENDPOINTS.BOOKINGS.BASE, {
      restaurantId,
    });
  },

  async getById(id: string): Promise<Booking> {
    return apiClient.get<Booking>(API_ENDPOINTS.BOOKINGS.BY_ID(id));
  },

  async updateStatus(id: string, status: string, reason?: string): Promise<Booking> {
    return apiClient.patch<Booking>(API_ENDPOINTS.BOOKINGS.UPDATE_STATUS(id), {
      status,
      cancellationReason: reason,
    });
  },

  async cancel(id: string): Promise<Booking> {
    return apiClient.delete<Booking>(API_ENDPOINTS.BOOKINGS.BY_ID(id));
  },
};

