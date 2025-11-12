import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RestaurantList from '../components/RestaurantList';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, cities, cuisineTypes } from '../data/mockData';
import './Home.css';

function Home() {
  const [selectedCity, setSelectedCity] = useState('hanoi');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedSuitableFor, setSelectedSuitableFor] = useState<string[]>([]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
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

      if (selectedPriceRange && restaurant.priceRange !== selectedPriceRange) {
        return false;
      }

      if (
        selectedCuisine.length > 0 &&
        !selectedCuisine.some((cuisine) => restaurant.cuisine.includes(cuisine))
      ) {
        return false;
      }

      if (
        selectedSuitableFor.length > 0 &&
        !selectedSuitableFor.some((item) =>
          restaurant.suitableFor.includes(item)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [
    selectedCity,
    selectedDistrict,
    searchQuery,
    selectedPriceRange,
    selectedCuisine,
    selectedSuitableFor,
  ]);

  const featuredRestaurants = restaurants
    .filter((r) => r.rating >= 4.5)
    .slice(0, 4);

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
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
                key={cuisine}
                to={`/an-uong/${selectedCity}/${cuisine}`}
                className="category-card"
              >
                <div className="category-icon">🍽️</div>
                <span className="category-name">{cuisine}</span>
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
          <LocationSelector
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onCityChange={setSelectedCity}
            onDistrictChange={setSelectedDistrict}
          />
          <SearchBar onSearch={setSearchQuery} />
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
