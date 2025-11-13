import React from 'react';
import type { Restaurant } from '../services/restaurants.service';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  if (restaurants.length === 0) {
    return (
      <div className="no-results">
        <p>Không tìm thấy nhà hàng nào phù hợp với bộ lọc của bạn.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <h2 className="section-title">Nhà hàng uy tín</h2>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;

