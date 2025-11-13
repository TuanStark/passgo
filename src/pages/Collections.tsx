import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collectionsService, type Collection } from '../services/collections.service';
import { locationsService, type City } from '../services/locations.service';
import { restaurantsService, type Restaurant } from '../services/restaurants.service';
import RestaurantCard from '../components/RestaurantCard';
import './Collections.css';

function Collections() {
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cities
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await locationsService.getCities();
        setCities(Array.isArray(citiesData) ? citiesData : []);
        
        // Set default city from URL param
        if (city && Array.isArray(citiesData)) {
          const matched = citiesData.find(
            (c) => c.code?.toLowerCase() === city.toLowerCase() || c.id === city,
          );
          if (matched) {
            setSelectedCity(matched.id);
          }
        }
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities([]);
      }
    };
    loadCities();
  }, [city]);

  // Load collections
  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const cityId = selectedCity !== 'all' ? selectedCity : undefined;
        const data = await collectionsService.getAll(cityId);
        setCollections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading collections:', error);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, [selectedCity]);

  // Helper function to normalize restaurant data from collection
  const normalizeRestaurantFromCollection = (item: any): Restaurant => {
    const restaurant = item.restaurant || item;
    return {
      ...restaurant,
      cuisines: restaurant.cuisines?.map((c: any) => ({
        id: c.cuisine?.id || c.id,
        name: c.cuisine?.name || c.name,
        slug: c.cuisine?.slug || c.slug,
        icon: c.cuisine?.icon || c.icon,
      })) || [],
      images: restaurant.images?.map((img: any) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        imageType: img.imageType,
      })) || [],
      city: restaurant.city,
      district: restaurant.district,
    } as Restaurant;
  };

  // Component for individual collection card
  const CollectionCard = ({ collection }: { collection: Collection }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loadingRestaurants, setLoadingRestaurants] = useState(true);

    useEffect(() => {
      const loadRestaurants = async () => {
        try {
          const collectionData = await collectionsService.getById(collection.id);
          // Handle API response structure: restaurants array with restaurant objects
          const restaurantsData = (collectionData as any).restaurants || collectionData.restaurants || [];
          // Normalize restaurant data from collection structure
          const normalizedRestaurants = restaurantsData.map(normalizeRestaurantFromCollection);
          setRestaurants(normalizedRestaurants);
        } catch (error) {
          console.error('Error loading collection restaurants:', error);
          setRestaurants([]);
        } finally {
          setLoadingRestaurants(false);
        }
      };
      loadRestaurants();
    }, [collection.id]);

    return (
      <div className="collection-card">
        <div className="collection-image">
          <img src={collection.imageUrl || collection.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600'} alt={collection.title} />
          <div className="collection-overlay">
            <h3>{collection.title}</h3>
            <p>{collection.description}</p>
            <span className="restaurant-count">
              {restaurants.length} nhà hàng
            </span>
          </div>
        </div>
        <div className="collection-restaurants">
          <h4>Nhà hàng trong bộ sưu tập</h4>
          {loadingRestaurants ? (
            <div className="loading-restaurants">
              <div className="mini-spinner"></div>
              <p>Đang tải nhà hàng...</p>
            </div>
          ) : restaurants.length === 0 ? (
            <p className="no-restaurants">Chưa có nhà hàng trong bộ sưu tập này</p>
          ) : (
            <div className="restaurants-mini-grid">
              {restaurants.map((restaurant: Restaurant, index: number) => (
                <RestaurantCard key={restaurant.id || `restaurant-${collection.id}-${index}`} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="collections-page">
      <div className="container">
        <div className="page-header">
          <h1>Bộ sưu tập</h1>
          <p>Khám phá các bộ sưu tập nhà hàng được tuyển chọn</p>
        </div>

        <div className="city-filter">
          <button
            className={selectedCity === 'all' ? 'active' : ''}
            onClick={() => setSelectedCity('all')}
          >
            Tất cả
          </button>
          {cities.map((city) => (
            <button
              key={city.id}
              className={selectedCity === city.id ? 'active' : ''}
              onClick={() => setSelectedCity(city.id)}
            >
              {city.name}
            </button>
          ))}
        </div>

        <div className="collections-grid">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Đang tải bộ sưu tập...</p>
            </div>
          ) : collections.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📚</div>
              <h3>Không tìm thấy bộ sưu tập nào</h3>
              <p>Thử chọn thành phố khác hoặc quay lại sau</p>
            </div>
          ) : (
            collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;

