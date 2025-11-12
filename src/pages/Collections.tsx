import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { collections, restaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import './Collections.css';

function Collections() {
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState(city || 'all');

  const filteredCollections = selectedCity === 'all'
    ? collections
    : collections.filter((c) => !c.city || c.city === selectedCity);

  const getRestaurantsByCollection = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection) return [];
    return restaurants.filter((r) => collection.restaurantIds.includes(r.id));
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
          {filteredCollections.map((collection) => {
            const collectionRestaurants = getRestaurantsByCollection(collection.id);
            return (
              <div key={collection.id} className="collection-card">
                <div className="collection-image">
                  <img src={collection.image} alt={collection.title} />
                  <div className="collection-overlay">
                    <h3>{collection.title}</h3>
                    <p>{collection.description}</p>
                    <span className="restaurant-count">
                      {collectionRestaurants.length} nhà hàng
                    </span>
                  </div>
                </div>
                <div className="collection-restaurants">
                  <h4>Nhà hàng trong bộ sưu tập</h4>
                  <div className="restaurants-mini-grid">
                    {collectionRestaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Collections;

