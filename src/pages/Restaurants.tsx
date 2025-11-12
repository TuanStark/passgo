import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RestaurantList from '../components/RestaurantList';
import { restaurants, cities } from '../data/mockData';
import './Restaurants.css';

function Restaurants() {
  const { city, category } = useParams();
  const [selectedCity, setSelectedCity] = useState(city || 'hanoi');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>(
    category ? [category] : []
  );
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
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Ăn uống</h1>
          <p>Khám phá các nhà hàng ngon nhất tại thành phố của bạn</p>
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

export default Restaurants;

