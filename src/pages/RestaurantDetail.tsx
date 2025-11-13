import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import BookingWidget from '../components/BookingWidget';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantsService } from '../services/restaurants.service';
import type { Restaurant } from '../services/restaurants.service';
import './RestaurantDetail.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const DAY_OF_WEEK_MAP: Record<string, string> = {
  MONDAY: 'Thứ 2',
  TUESDAY: 'Thứ 3',
  WEDNESDAY: 'Thứ 4',
  THURSDAY: 'Thứ 5',
  FRIDAY: 'Thứ 6',
  SATURDAY: 'Thứ 7',
  SUNDAY: 'Chủ nhật',
};

const formatTime = (value?: string) => {
  if (!value) return '';

  // Handle time strings like "11:00:00"
  if (/^\d{2}:\d{2}/.test(value)) {
    return value.substring(0, 5);
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return value;
};

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [relatedRestaurants, setRelatedRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    const loadRestaurant = async () => {
      if (!id) {
        setRestaurant(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await restaurantsService.getById(id);
        setRestaurant(data);

        if (data?.cityId) {
          setLoadingRelated(true);
          const related = await restaurantsService.getAll({ cityId: data.cityId, limit: 4 });
          setRelatedRestaurants(related.filter((item) => item.id !== data.id));
        } else {
          setRelatedRestaurants([]);
        }
      } catch (error) {
        console.error('Error loading restaurant detail:', error);
        setRestaurant(null);
        setRelatedRestaurants([]);
      } finally {
        setLoading(false);
        setLoadingRelated(false);
      }
    };

    loadRestaurant();
  }, [id]);

  const mainImage = useMemo(() => {
    if (!restaurant?.images || restaurant.images.length === 0) {
      return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800';
    }
    return (
      restaurant.images.find((image) => image.imageType === 'MAIN')?.imageUrl ||
      restaurant.images[0].imageUrl
    );
  }, [restaurant]);

  const galleryImages = useMemo(() => {
    if (!restaurant?.images) return [];
    const images = restaurant.images.filter((image) => image.imageType === 'GALLERY');
    if (images.length === 0) {
      return restaurant.images.map((image) => image.imageUrl).slice(0, 4);
    }
    return images.map((image) => image.imageUrl);
  }, [restaurant]);

  const menuImages = useMemo(() => {
    if (!restaurant?.images) return [];
    return restaurant.images
      .filter((image) => image.imageType === 'MENU')
      .map((image) => image.imageUrl);
  }, [restaurant]);

  const cuisinesText = restaurant?.cuisines?.map((cuisine) => cuisine.name).join(', ');

  const latitude = restaurant?.latitude ? Number(restaurant.latitude) : null;
  const longitude = restaurant?.longitude ? Number(restaurant.longitude) : null;

  if (loading) {
    return (
      <div className="restaurant-detail-page">
        <div className="container">
          <p>Đang tải thông tin nhà hàng...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-detail-page">
        <div className="container">
          <p>Không tìm thấy nhà hàng</p>
        </div>
      </div>
    );
  }

  const handleBook = (bookingData: { date: string; time: string; guests: number }) => {
    navigate('/dat-ban', {
      state: {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        date: bookingData.date,
        time: bookingData.time,
        guests: bookingData.guests,
      },
    });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="restaurant-detail-page">
      <div className="container">
        <div className="restaurant-header">
          <h1 className="restaurant-title">{restaurant.name}</h1>
          <div className="restaurant-meta-info">
            <div className="meta-item">
              <span className="meta-label">Địa chỉ:</span>
              <span>
                {restaurant.address}
                {restaurant.district?.name ? `, ${restaurant.district.name}` : ''}
                {restaurant.city?.name ? `, ${restaurant.city.name}` : ''}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Giá trung bình:</span>
              <span>{restaurant.averagePrice || restaurant.priceRange || 'Đang cập nhật'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Thực đơn:</span>
              <span>{cuisinesText || 'Đang cập nhật'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Sức chứa:</span>
              <span>{restaurant.capacity || 'Đang cập nhật'} chỗ</span>
            </div>
          </div>
        </div>

        <div className="image-section">
          <div className="main-image">
            <img src={mainImage} alt={restaurant.name} />
          </div>
          <div className="image-gallery">
            {[mainImage, ...galleryImages].slice(0, 4).map((img, idx) => (
              <div key={`${img}-${idx}`} className="gallery-thumb">
                <img src={img} alt={`${restaurant.name} ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div className="booking-widget-container">
            <BookingWidget restaurantName={restaurant.name} onBook={handleBook} />
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-title">Thông tin nhà hàng {restaurant.name}</h2>
          <p className="restaurant-description">
            {restaurant.description ||
              `Khám phá ${restaurant.name} với thực đơn ${cuisinesText || 'đa dạng'} và dịch vụ tận tâm.`}
          </p>

          <div className="info-table">
            <div className="info-row">
              <div className="info-label">Giờ mở cửa</div>
              <div className="info-value">
                {restaurant.openingHours && restaurant.openingHours.length > 0 ? (
                  <div className="hours-list">
                    {restaurant.openingHours.map((hours) => (
                      <div key={hours.id || hours.dayOfWeek} className="hours-item">
                        <span>{DAY_OF_WEEK_MAP[hours.dayOfWeek] || hours.dayOfWeek}:</span>
                        <span>
                          {hours.isClosed ? 'Nghỉ' : `${formatTime(hours.openTime)} - ${formatTime(hours.closeTime)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  'Đang cập nhật'
                )}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Giá trung bình</div>
              <div className="info-value">{restaurant.averagePrice || restaurant.priceRange || 'Đang cập nhật'}</div>
            </div>
          </div>

          {restaurant.regulations && restaurant.regulations.length > 0 && (
            <div className="regulations-section">
              <h3 className="subsection-title">Quy định</h3>
              <ul className="regulations-list">
                {restaurant.regulations.map((regulation) => (
                  <li key={regulation.id} className="regulation-item">
                    {regulation.regulationText}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {menuImages.length > 0 && (
          <div className="menu-section">
            <h2 className="section-title">Thực đơn {restaurant.name}</h2>
            <div className="menu-grid">
              {menuImages.map((menuImg, idx) => (
                <div key={`${menuImg}-${idx}`} className="menu-item">
                  <img src={menuImg} alt={`Menu ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {restaurant.amenities && (
          <div className="amenities-section">
            <h2 className="section-title">Tiện ích</h2>
            <div className="amenities-grid">
              {Object.entries(restaurant.amenities).map(([key, value]) => {
                if (key === 'id' || key === 'restaurantId' || typeof value !== 'boolean') {
                  return null;
                }
                const labels: Record<string, string> = {
                  wifi: 'Wifi',
                  airConditioning: 'Điều hòa',
                  cardPayment: 'Thanh toán thẻ',
                  privateRoom: 'Phòng riêng',
                  parking: 'Chỗ đỗ xe',
                  smoking: 'Hút thuốc',
                  karaoke: 'Karaoke',
                  stage: 'Sân khấu',
                  eventDecoration: 'Trang trí sự kiện',
                  outsideFood: 'Mang đồ ăn ngoài',
                  outsideDrinks: 'Mang đồ uống ngoài',
                };
                return (
                  <div key={key} className="amenity-item">
                    <span className={`amenity-icon ${value ? 'available' : 'unavailable'}`}>{value ? '✓' : '✗'}</span>
                    <span className={value ? '' : 'unavailable-text'}>{labels[key] || key}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {galleryImages.length > 0 && (
          <div className="gallery-section">
            <h2 className="section-title">Hình ảnh {restaurant.name}</h2>
            <div className="gallery-grid">
              {galleryImages.map((img, idx) => (
                <div key={`${img}-${idx}`} className="gallery-item">
                  <img src={img} alt={`${restaurant.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {latitude !== null && longitude !== null && (
          <div className="location-section">
            <h2 className="section-title">Chỉ đường</h2>
            {GOOGLE_MAPS_API_KEY ? (
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: latitude, lng: longitude }} zoom={15}>
                  <Marker position={{ lat: latitude, lng: longitude }} />
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="map-placeholder">
                <p>Vui lòng thêm VITE_GOOGLE_MAPS_API_KEY vào file .env</p>
              </div>
            )}
          </div>
        )}

        {restaurant.openingHours && restaurant.openingHours.length > 0 && (
          <div className="hours-section">
            <h2 className="section-title">Giờ hoạt động</h2>
            <table className="hours-table">
              <thead>
                <tr>
                  <th>Thứ</th>
                  <th>Giờ mở cửa</th>
                </tr>
              </thead>
              <tbody>
                {restaurant.openingHours.map((hours) => (
                  <tr key={hours.id || hours.dayOfWeek}>
                    <td>{DAY_OF_WEEK_MAP[hours.dayOfWeek] || hours.dayOfWeek}</td>
                    <td>{hours.isClosed ? 'Nghỉ' : `${formatTime(hours.openTime)} - ${formatTime(hours.closeTime)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loadingRelated ? (
          <div className="related-section">
            <h2 className="section-title">Có thể bạn quan tâm</h2>
            <p>Đang tải...</p>
          </div>
        ) : (
          relatedRestaurants.length > 0 && (
            <div className="related-section">
              <h2 className="section-title">Có thể bạn quan tâm</h2>
              <div className="related-grid">
                {relatedRestaurants.map((related) => (
                  <div key={related.id} onClick={() => navigate(`/nha-hang/${related.id}`)}>
                    <RestaurantCard restaurant={related} />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;

