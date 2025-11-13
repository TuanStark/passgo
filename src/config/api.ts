// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  // Restaurants
  RESTAURANTS: {
    BASE: '/restaurants',
    NEARBY: '/restaurants/nearby',
    TRUSTED: '/restaurants/trusted',
    BY_SLUG: (slug: string) => `/restaurants/slug/${slug}`,
    BY_ID: (id: string) => `/restaurants/${id}`,
  },
  // Locations
  LOCATIONS: {
    CITIES: '/locations/cities',
    CITY: (id: string) => `/locations/cities/${id}`,
    DISTRICTS: (cityId: string) => `/locations/cities/${cityId}/districts`,
    CUISINES: '/locations/cuisines',
  },
  // Collections
  COLLECTIONS: {
    BASE: '/collections',
    BY_SLUG: (slug: string) => `/collections/slug/${slug}`,
    BY_ID: (id: string) => `/collections/${id}`,
  },
  // Blog
  BLOG: {
    BASE: '/blog',
    CATEGORIES: '/blog/categories',
    MOST_VIEWED: '/blog/most-viewed',
    BY_SLUG: (slug: string) => `/blog/slug/${slug}`,
    BY_ID: (id: string) => `/blog/${id}`,
  },
  // Bookings
  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id: string) => `/bookings/${id}`,
    UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
  },
  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: string) => `/reviews/${id}`,
  },
  // Users
  USERS: {
    PROFILE: '/users/me',
    BOOKINGS: '/users/me/bookings',
    FAVORITES: '/users/me/favorites',
    ADD_FAVORITE: (restaurantId: string) => `/users/me/favorites/${restaurantId}`,
    REMOVE_FAVORITE: (restaurantId: string) => `/users/me/favorites/${restaurantId}`,
    BY_ID: (id: string) => `/users/${id}`,
  },
};

