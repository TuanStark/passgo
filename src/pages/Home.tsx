import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RestaurantList from '../components/RestaurantList';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantsService } from '../services/restaurants.service';
import { locationsService } from '../services/locations.service';
import type { Restaurant } from '../services/restaurants.service';
import type { City, CuisineType } from '../services/locations.service';
import './Home.css';

function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedSuitableFor, setSelectedSuitableFor] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [cuisineTypes, setCuisineTypes] = useState<CuisineType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantsData, citiesData, cuisinesData] = await Promise.all([
          restaurantsService.getAll(),
          locationsService.getCities(),
          locationsService.getCuisineTypes(),
        ]);
        // Ensure restaurants is always an array
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
        setCities(Array.isArray(citiesData) ? citiesData : []);
        setCuisineTypes(Array.isArray(cuisinesData) ? cuisinesData : []);
        if (Array.isArray(citiesData) && citiesData.length > 0) {
          setSelectedCity(citiesData[0].id);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Set empty arrays on error
        setRestaurants([]);
        setCities([]);
        setCuisineTypes([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Load restaurants when filters change
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const filters: any = {};
        if (selectedCity) filters.cityId = selectedCity;
        if (selectedDistrict) filters.districtId = selectedDistrict;
        if (selectedPriceRange) filters.priceRange = selectedPriceRange;
        if (selectedCuisine.length > 0) filters.cuisineIds = selectedCuisine;
        if (searchQuery) filters.search = searchQuery;
        filters.limit = 20;

        const data = await restaurantsService.getAll(filters);
        // Ensure data is always an array
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        setRestaurants([]);
      }
    };
    if (!loading && selectedCity) {
      loadRestaurants();
    }
  }, [selectedCity, selectedDistrict, selectedPriceRange, selectedCuisine, searchQuery, loading]);

  const filteredRestaurants = useMemo(() => {
    // Ensure restaurants is an array before filtering
    if (!Array.isArray(restaurants)) {
      return [];
    }
    let filtered = [...restaurants];

    // Client-side filtering for search query
    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Client-side filtering for cuisine (if multiple selected)
    if (selectedCuisine.length > 0) {
      filtered = filtered.filter((restaurant) =>
        restaurant.cuisines?.some((c) => selectedCuisine.includes(c.id))
      );
    }

    return filtered;
  }, [restaurants, searchQuery, selectedCuisine]);

  const featuredRestaurants = Array.isArray(restaurants)
    ? restaurants.filter((r) => r.rating >= 4.5).slice(0, 4)
    : [];

  const handleCuisineChange = (cuisineId: string) => {
    setSelectedCuisine((prev) =>
      prev.includes(cuisineId)
        ? prev.filter((c) => c !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handleSuitableForChange = (item: string) => {
    setSelectedSuitableFor((prev) =>
      prev.includes(item)
        ? prev.filter((s) => s !== item)
        : [...prev, item]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange((prev) => (prev === range ? '' : range));
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-banner">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Booking Res
              </h1>
              <p className="hero-subtitle">
                Đặt bàn, đặt chỗ nhà hàng trực tuyến và nhận ưu đãi hấp dẫn
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Nhà hàng</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Khách hàng</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.8★</span>
                  <span className="stat-label">Đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Quick Categories */}
        <section className="categories-section">
          <h2 className="section-title">Khám phá theo loại món</h2>
          <div className="categories-grid">
            {cuisineTypes.slice(0, 8).map((cuisine) => (
              <Link
                key={cuisine.id}
                to={`/an-uong/${selectedCity}/${cuisine.slug}`}
                className="category-card"
              >
                <div className="category-icon">🍽️</div>
                <span className="category-name">{cuisine.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        {featuredRestaurants.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">Nhà hàng nổi bật</h2>
              <Link to="/nha-hang-uy-tin" className="view-all-link">
                Xem tất cả →
              </Link>
            </div>
            <div className="featured-grid">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </section>
        )}

        {/* Special Offers Banner */}
        <section className="offers-banner">
          <div className="offer-content">
            <h3>🎉 Ưu đãi đặc biệt</h3>
            <p>Giảm đến 20% cho đơn đặt bàn đầu tiên</p>
            <Link to="/an-uong" className="offer-btn">
              Khám phá ngay
            </Link>
          </div>
        </section>

        {/* Search Section */}
        <div className="search-section">
          <h2 className="section-title">Tìm kiếm nhà hàng</h2>
          <div className='dis'>
            <LocationSelector
              selectedCity={selectedCity}
              selectedDistrict={selectedDistrict}
              onCityChange={setSelectedCity}
              onDistrictChange={setSelectedDistrict}
              cities={cities}
            />
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>

        {/* Main Content */}
        <div className="content-layout">
          <aside className="sidebar">
            <Filters
              selectedPriceRange={selectedPriceRange}
              selectedCuisine={selectedCuisine}
              selectedSuitableFor={selectedSuitableFor}
              onPriceRangeChange={handlePriceRangeChange}
              onCuisineChange={handleCuisineChange}
              onSuitableForChange={handleSuitableForChange}
              cuisineTypes={cuisineTypes}
            />
          </aside>

          <div className="main-area">
            <RestaurantList restaurants={filteredRestaurants} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
