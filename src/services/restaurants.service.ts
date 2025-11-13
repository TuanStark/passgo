import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address: string;
  districtId?: string;
  cityId?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  priceRange?: string;
  averagePrice?: string;
  capacity: number;
  hasPrivateRoom: boolean;
  isExclusive: boolean;
  isActive: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  viewCount: number;
  city?: { id: string; name: string; code?: string };
  district?: { id: string; name: string };
  images?: Array<{ id: string; imageUrl: string; imageType: string }>;
  cuisines?: Array<{ id: string; name: string; slug?: string; icon?: string }>;
  amenities?: {
    id?: string;
    wifi: boolean;
    airConditioning: boolean;
    cardPayment: boolean;
    privateRoom: boolean;
    parking: boolean;
    smoking: boolean;
    karaoke: boolean;
    stage: boolean;
    eventDecoration: boolean;
    outsideFood: boolean;
    outsideDrinks: boolean;
  } | null;
  openingHours?: Array<{
    id?: string;
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
  regulations?: Array<{ id: string; regulationText: string }>;
  distance?: number;
}

export interface FilterRestaurantDto {
  cityId?: string;
  districtId?: string;
  cuisineIds?: string[];
  priceRange?: string;
  minRating?: number;
  hasPrivateRoom?: boolean;
  isExclusive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface RestaurantsResponse {
  data: Restaurant[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const normalizeCuisine = (cuisine: any) => {
  if (!cuisine) return cuisine;
  if (cuisine.cuisine) {
    return {
      id: cuisine.cuisine.id,
      name: cuisine.cuisine.name,
      slug: cuisine.cuisine.slug,
      icon: cuisine.cuisine.icon,
    };
  }
  return {
    id: cuisine.id,
    name: cuisine.name,
    slug: cuisine.slug,
    icon: cuisine.icon,
  };
};

const normalizeRestaurant = (restaurant: any): Restaurant => {
  if (!restaurant) return restaurant;

  return {
    ...restaurant,
    cuisines: restaurant.cuisines?.map(normalizeCuisine) ?? [],
    images:
      restaurant.images?.map((image: any) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        imageType: image.imageType,
      })) ?? [],
    openingHours:
      restaurant.openingHours?.map((hour: any) => ({
        id: hour.id,
        dayOfWeek: hour.dayOfWeek,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        isClosed: hour.isClosed,
      })) ?? [],
    regulations:
      restaurant.regulations?.map((regulation: any) => ({
        id: regulation.id,
        regulationText: regulation.regulationText ?? regulation,
      })) ?? [],
    amenities: restaurant.amenities ?? null,
    distance: restaurant.distance,
  };
};

export const restaurantsService = {
  async getAll(filters?: FilterRestaurantDto): Promise<Restaurant[]> {
    const response = await apiClient.get<RestaurantsResponse | Restaurant[]>(
      API_ENDPOINTS.RESTAURANTS.BASE,
      filters ? { ...filters } : undefined,
    );
    const data = Array.isArray(response) ? response : response.data || [];
    return data.map((restaurant) => normalizeRestaurant(restaurant));
  },

  async getById(id: string): Promise<Restaurant> {
    const restaurant = await apiClient.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_ID(id));
    return normalizeRestaurant(restaurant);
  },

  async getBySlug(slug: string): Promise<Restaurant> {
    const restaurant = await apiClient.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_SLUG(slug));
    return normalizeRestaurant(restaurant);
  },

  async getNearby(lat: number, lng: number, radius?: number): Promise<Restaurant[]> {
    const response = await apiClient.get<Restaurant[]>(API_ENDPOINTS.RESTAURANTS.NEARBY, {
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius?.toString(),
    });
    return Array.isArray(response) ? response.map((restaurant) => normalizeRestaurant(restaurant)) : [];
  },

  async getTrusted(cityId?: string): Promise<Restaurant[]> {
    const response = await apiClient.get<Restaurant[]>(API_ENDPOINTS.RESTAURANTS.TRUSTED, {
      cityId,
    });
    return Array.isArray(response) ? response.map((restaurant) => normalizeRestaurant(restaurant)) : [];
  },
};

