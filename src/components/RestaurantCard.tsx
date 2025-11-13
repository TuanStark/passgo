import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../services/restaurants.service';
import './RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/nha-hang/${restaurant.id}`);
  };

  // Get main image or first image
  const imageUrl = restaurant.images?.find(img => img.imageType === 'MAIN')?.imageUrl 
    || restaurant.images?.[0]?.imageUrl 
    || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800';

  // Get city and district names
  const cityName = restaurant.city?.name || '';
  const districtName = restaurant.district?.name || '';

  // Get cuisine names
  const cuisineNames = restaurant.cuisines?.map(c => c.name) || [];

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="restaurant-image">
        <img src={imageUrl} alt={restaurant.name} />
        {restaurant.isExclusive && (
          <span className="exclusive-badge">Độc quyền</span>
        )}
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-address">
          {restaurant.address}{districtName && `, ${districtName}`}{cityName && `, ${cityName}`}
        </p>
        <div className="restaurant-meta">
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{restaurant.rating}</span>
            <span className="review-count">({restaurant.reviewCount} đánh giá)</span>
          </div>
          <div className="price-range">{restaurant.priceRange || 'N/A'}</div>
        </div>
        <div className="restaurant-tags">
          {cuisineNames.slice(0, 2).map((tag) => (
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

