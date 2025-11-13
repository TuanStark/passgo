import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collectionsService } from '../services/collections.service';
import RestaurantCard from '../components/RestaurantCard';
import './Collections.css';

function Collections() {
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState(city || 'all');
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      try {
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

  // Component for individual collection card
  const CollectionCard = ({ collection }: { collection: any }) => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loadingRestaurants, setLoadingRestaurants] = useState(true);

    useEffect(() => {
      const loadRestaurants = async () => {
        try {
          const collectionData = await collectionsService.getById(collection.id);
          setRestaurants(collectionData.restaurants || []);
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
            <p>Đang tải nhà hàng...</p>
          ) : (
            <div className="restaurants-mini-grid">
              {restaurants.map((restaurant: any) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
          <button
            className={selectedCity === 'Hà Nội' ? 'active' : ''}
            onClick={() => setSelectedCity('Hà Nội')}
          >
            Hà Nội
          </button>
          <button
            className={selectedCity === 'Hồ Chí Minh' ? 'active' : ''}
            onClick={() => setSelectedCity('Hồ Chí Minh')}
          >
            Hồ Chí Minh
          </button>
        </div>

        <div className="collections-grid">
          {loading ? (
            <p>Đang tải...</p>
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

