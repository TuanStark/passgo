import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RestaurantList from '../components/RestaurantList';
import { restaurantsService } from '../services/restaurants.service';
import { locationsService } from '../services/locations.service';
import type { Restaurant } from '../services/restaurants.service';
import type { City, CuisineType } from '../services/locations.service';
import './Restaurants.css';

function Restaurants() {
  const { city: cityParam, category } = useParams();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [cuisineTypes, setCuisineTypes] = useState<CuisineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  // Load cities and cuisine types
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [citiesData, cuisineData] = await Promise.all([
          locationsService.getCities(),
          locationsService.getCuisineTypes(),
        ]);

        setCities(Array.isArray(citiesData) ? citiesData : []);
        setCuisineTypes(Array.isArray(cuisineData) ? cuisineData : []);

        // Determine selected city based on route param or default to first city
        let defaultCityId = '';
        if (Array.isArray(citiesData) && cityParam) {
          const matchedCity = citiesData.find(
            (c) => c.code?.toLowerCase() === cityParam.toLowerCase() || c.id === cityParam,
          );
          if (matchedCity) {
            defaultCityId = matchedCity.id;
          }
        }
        if (!defaultCityId && Array.isArray(citiesData) && citiesData.length > 0) {
          defaultCityId = citiesData[0].id;
        }
        setSelectedCity(defaultCityId);

        // Determine selected cuisine based on route param
        if (category && Array.isArray(cuisineData)) {
          const matchedCuisine = cuisineData.find(
            (c) => c.slug?.toLowerCase() === category.toLowerCase() || c.id === category,
          );
          if (matchedCuisine) {
            setSelectedCuisine([matchedCuisine.id]);
          }
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        setCities([]);
        setCuisineTypes([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [cityParam, category]);

  // Load restaurants whenever filters change
  useEffect(() => {
    const loadRestaurants = async () => {
      if (!selectedCity) {
        setRestaurants([]);
        return;
      }

      setLoadingRestaurants(true);
      try {
        const filters: any = {
          cityId: selectedCity,
          limit: 30,
        };
        if (selectedDistrict) filters.districtId = selectedDistrict;
        if (selectedPriceRange) filters.priceRange = selectedPriceRange;
        if (selectedCuisine.length > 0) filters.cuisineIds = selectedCuisine;
        if (searchQuery) filters.search = searchQuery;

        const data = await restaurantsService.getAll(filters);
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        setRestaurants([]);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    if (!loading) {
      loadRestaurants();
    }
  }, [loading, selectedCity, selectedDistrict, selectedPriceRange, selectedCuisine, searchQuery]);

  const handleCuisineChange = (cuisineId: string) => {
    setSelectedCuisine((prev) =>
      prev.includes(cuisineId)
        ? prev.filter((c) => c !== cuisineId)
        : [...prev, cuisineId],
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
          <div className='dis'>
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
        </div>

        <div className="content-layout">
          <aside className="sidebar">
            <Filters
              selectedPriceRange={selectedPriceRange}
              selectedCuisine={selectedCuisine}
              selectedSuitableFor={[]}
              onPriceRangeChange={handlePriceRangeChange}
              onCuisineChange={handleCuisineChange}
              onSuitableForChange={() => undefined}
              cuisineTypes={cuisineTypes}
            />
          </aside>

          <div className="main-area">
            {loadingRestaurants ? (
              <div className="loading-state">Đang tải danh sách nhà hàng...</div>
            ) : (
              <RestaurantList restaurants={restaurants} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;

