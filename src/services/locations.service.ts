import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface City {
  id: string;
  name: string;
  code?: string;
}

export interface District {
  id: string;
  name: string;
  code?: string;
  cityId: string;
}

export interface CuisineType {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export const locationsService = {
  async getCities(): Promise<City[]> {
    return apiClient.get<City[]>(API_ENDPOINTS.LOCATIONS.CITIES);
  },

  async getCity(id: string): Promise<City> {
    return apiClient.get<City>(API_ENDPOINTS.LOCATIONS.CITY(id));
  },

  async getDistricts(cityId: string): Promise<District[]> {
    return apiClient.get<District[]>(API_ENDPOINTS.LOCATIONS.DISTRICTS(cityId));
  },

  async getCuisineTypes(): Promise<CuisineType[]> {
    return apiClient.get<CuisineType[]>(API_ENDPOINTS.LOCATIONS.CUISINES);
  },
};

