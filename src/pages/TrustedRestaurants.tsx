import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';
import { restaurantsService } from '../services/restaurants.service';
import { locationsService } from '../services/locations.service';
import type { Restaurant } from '../services/restaurants.service';
import type { City } from '../services/locations.service';
import './TrustedRestaurants.css';

function TrustedRestaurants() {
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await locationsService.getCities();
        setCities(Array.isArray(citiesData) ? citiesData : []);

        let defaultCityId = '';
        if (Array.isArray(citiesData) && city) {
          const matched = citiesData.find(
            (c) => c.code?.toLowerCase() === city.toLowerCase() || c.id === city,
          );
          if (matched) {
            defaultCityId = matched.id;
          }
        }
        if (!defaultCityId && Array.isArray(citiesData) && citiesData.length > 0) {
          defaultCityId = citiesData[0].id;
        }
        setSelectedCity(defaultCityId);
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [city]);

  useEffect(() => {
    const loadTrusted = async () => {
      if (!selectedCity) {
        setRestaurants([]);
        return;
      }

      setLoadingRestaurants(true);
      try {
        const data = await restaurantsService.getTrusted(selectedCity);
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading trusted restaurants:', error);
        setRestaurants([]);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    if (!loading) {
      loadTrusted();
    }
  }, [loading, selectedCity]);

  const filteredRestaurants = useMemo(() => {
    let list = Array.isArray(restaurants) ? [...restaurants] : [];

    if (selectedDistrict) {
      list = list.filter(
        (restaurant) =>
          restaurant.districtId === selectedDistrict || restaurant.district?.id === selectedDistrict,
      );
    }

    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      list = list.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(normalized) ||
          restaurant.address.toLowerCase().includes(normalized),
      );
    }

    return list;
  }, [restaurants, selectedDistrict, searchQuery]);

  return (
    <div className="trusted-restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Nhà hàng uy tín</h1>
          <p>Danh sách các nhà hàng được đánh giá cao và uy tín nhất</p>
        </div>

        <div className="search-section">
          <LocationSelector
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onCityChange={(cityId) => {
              setSelectedCity(cityId);
              setSelectedDistrict('');
            }}
            onDistrictChange={setSelectedDistrict}
            cities={cities}
          />
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="trusted-badge-info">
          <div className="badge-info-card">
            <span className="badge-icon">⭐</span>
            <div>
              <h3>Tiêu chuẩn uy tín</h3>
              <p>Đánh giá từ 4.5 sao trở lên và có trên 200 đánh giá</p>
            </div>
          </div>
        </div>

        <div className="main-area">
          {loadingRestaurants ? (
            <div className="loading-state">Đang tải danh sách nhà hàng uy tín...</div>
          ) : (
            <RestaurantList restaurants={filteredRestaurants} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TrustedRestaurants;

