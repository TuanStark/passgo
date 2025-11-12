import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import type { Restaurant } from '../data/mockData';
import { restaurants } from '../data/mockData';
import './Nearby.css';

// Default center (Hanoi)
const defaultCenter = {
  lat: 21.0285,
  lng: 105.8542,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function Nearby() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [showAppBanner, setShowAppBanner] = useState(true);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants.filter((r) => r.lat && r.lng);

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((r) =>
        r.cuisine.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    // Calculate distances (mock)
    const distances: Record<string, number> = {
      '1': 0.12,
      '2': 0.18,
      '3': 0.21,
      '4': 0.27,
      '5': 0.34,
      '6': 0.37,
      '7': 0.41,
      '8': 0.45,
    };

    return filtered.map((r) => ({
      ...r,
      distance: distances[r.id] || Math.random() * 2,
    }));
  }, [searchQuery, selectedCategory]);

  const handleRestaurantClick = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    if (restaurant.lat && restaurant.lng) {
      setMapCenter({ lat: restaurant.lat, lng: restaurant.lng });
    }
  }, []);

  const handleMarkerClick = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  return (
    <div className="nearby-page">
      {showAppBanner && (
        <div className="app-banner">
          <div className="banner-content">
            <span>Hãy truy cập tính năng trên App để có những trải nghiệm tốt nhất nhé!</span>
            <a href="#" className="app-link">Hướng dẫn tải app</a>
          </div>
          <button className="close-banner" onClick={() => setShowAppBanner(false)}>
            ×
          </button>
        </div>
      )}

      <div className="nearby-layout">
        {/* Left Panel - Restaurant List */}
        <div className="restaurant-list-panel">
          <div className="filter-section">
            <div className="filter-buttons">
              <button className="filter-btn dropdown">
                Ngành hàng <span>▼</span>
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'Buffet' ? 'active' : ''}`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === 'Buffet' ? '' : 'Buffet')
                }
              >
                Buffet
              </button>
            </div>
          </div>

          <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className={`restaurant-item ${
                  selectedRestaurant?.id === restaurant.id ? 'selected' : ''
                }`}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <div className="restaurant-image-small">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="restaurant-details">
                  <h3 className="restaurant-name-small">{restaurant.name}</h3>
                  <p className="restaurant-address-small">{restaurant.address}</p>
                  <div className="restaurant-meta-small">
                    <span className="rating-small">
                      ★ {restaurant.rating} | {restaurant.distance?.toFixed(2)}km
                    </span>
                  </div>
                  <p className="restaurant-cuisine-small">
                    {restaurant.cuisine.join(', ')}
                  </p>
                  <button
                    className="book-btn-small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/nha-hang/${restaurant.id}`);
                    }}
                  >
                    Đặt chỗ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="map-panel">
          {GOOGLE_MAPS_API_KEY ? (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={13}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                {filteredRestaurants.map((restaurant) => {
                  if (!restaurant.lat || !restaurant.lng) return null;
                  const isSelected = selectedRestaurant?.id === restaurant.id;
                  return (
                    <Marker
                      key={restaurant.id}
                      position={{ lat: restaurant.lat, lng: restaurant.lng }}
                      onClick={() => handleMarkerClick(restaurant)}
                      icon={
                        isSelected
                          ? {
                              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            }
                          : {
                              url: 'http://maps.google.com/mapfiles/ms/icons/yellow.png',
                            }
                      }
                    />
                  );
                })}

                {selectedRestaurant && selectedRestaurant.lat && selectedRestaurant.lng && (
                  <InfoWindow
                    position={{
                      lat: selectedRestaurant.lat,
                      lng: selectedRestaurant.lng,
                    }}
                    onCloseClick={() => setSelectedRestaurant(null)}
                  >
                    <div className="info-window">
                      <h4>{selectedRestaurant.name}</h4>
                      <p>{selectedRestaurant.address}</p>
                      <p>★ {selectedRestaurant.rating}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div className="map-placeholder">
              <p>Vui lòng thêm VITE_GOOGLE_MAPS_API_KEY vào file .env</p>
            </div>
          )}

          <div className="map-search-bar">
            <span className="map-search-icon">📍</span>
            <input
              type="text"
              placeholder="Nhập địa chỉ tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="map-search-input"
            />
            <span className="map-search-icon">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nearby;
