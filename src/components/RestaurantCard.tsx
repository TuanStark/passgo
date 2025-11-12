import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../data/mockData';
import './RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/nha-hang/${restaurant.id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="restaurant-image">
        <img src={restaurant.image} alt={restaurant.name} />
        {restaurant.isExclusive && (
          <span className="exclusive-badge">Độc quyền</span>
        )}
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-address">
          {restaurant.address}, {restaurant.district}, {restaurant.city}
        </p>
        <div className="restaurant-meta">
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{restaurant.rating}</span>
            <span className="review-count">({restaurant.reviewCount} đánh giá)</span>
          </div>
          <div className="price-range">{restaurant.priceRange}</div>
        </div>
        <div className="restaurant-tags">
          {restaurant.cuisine.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="restaurant-features">
          {restaurant.hasPrivateRoom && (
            <span className="feature">Phòng riêng</span>
          )}
          <span className="feature">Sức chứa: {restaurant.capacity} người</span>
        </div>
        <button
          className="book-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/nha-hang/${restaurant.id}`);
          }}
        >
          Đặt bàn giữ chỗ
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;

