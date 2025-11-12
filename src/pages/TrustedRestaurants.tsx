import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';
import { restaurants, cities } from '../data/mockData';
import './TrustedRestaurants.css';

function TrustedRestaurants() {
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState(city || 'hanoi');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter only trusted restaurants (high rating and many reviews)
  const trustedRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Trusted criteria: rating >= 4.5 and reviewCount >= 200
      const isTrusted = restaurant.rating >= 4.5 && restaurant.reviewCount >= 200;

      if (!isTrusted) return false;

      const currentCity = cities.find((c) => c.id === selectedCity);
      if (currentCity && restaurant.city !== currentCity.name) {
        return false;
      }

      if (selectedDistrict && restaurant.district !== selectedDistrict) {
        return false;
      }

      if (
        searchQuery &&
        !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [selectedCity, selectedDistrict, searchQuery]);

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
            onCityChange={setSelectedCity}
            onDistrictChange={setSelectedDistrict}
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
          <RestaurantList restaurants={trustedRestaurants} />
        </div>
      </div>
    </div>
  );
}

export default TrustedRestaurants;

