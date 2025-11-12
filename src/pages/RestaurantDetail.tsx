import { useParams, useNavigate } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { restaurants } from '../data/mockData';
import BookingWidget from '../components/BookingWidget';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantDetail.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);

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
    alert(
      `Đặt bàn thành công!\nNhà hàng: ${restaurant.name}\nNgày: ${bookingData.date}\nGiờ: ${bookingData.time}\nSố người: ${bookingData.guests}`
    );
  };

  const relatedRestaurants = restaurants
    .filter((r) => r.id !== restaurant.id && r.city === restaurant.city)
    .slice(0, 4);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="restaurant-detail-page">
      <div className="container">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <h1 className="restaurant-title">{restaurant.name}</h1>
          <div className="restaurant-meta-info">
            <div className="meta-item">
              <span className="meta-label">Địa chỉ:</span>
              <span>{restaurant.address}, {restaurant.district}, {restaurant.city}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Giá trung bình:</span>
              <span>{restaurant.averagePrice || restaurant.priceRange}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Giờ mở cửa:</span>
              <span>
                {restaurant.openingHours
                  ? Object.values(restaurant.openingHours)[0]?.open +
                    ' - ' +
                    Object.values(restaurant.openingHours)[0]?.close
                  : '11:00 - 22:00'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Sức chứa:</span>
              <span>{restaurant.capacity} chỗ</span>
            </div>
          </div>
        </div>

        {/* Main Image and Gallery */}
        <div className="image-section">
          <div className="main-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
          <div className="image-gallery">
            {(restaurant.gallery || [restaurant.image]).slice(0, 4).map((img, idx) => (
              <div key={idx} className="gallery-thumb">
                <img src={img} alt={`${restaurant.name} ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div className="booking-widget-container">
            <BookingWidget restaurantName={restaurant.name} onBook={handleBook} />
          </div>
        </div>

        {/* Restaurant Information */}
        <div className="info-section">
          <h2 className="section-title">Thông tin nhà hàng {restaurant.name}</h2>
          <p className="restaurant-description">
            {restaurant.description ||
              `${restaurant.name} là một nhà hàng ${restaurant.cuisine.join(', ')} với không gian ${restaurant.suitableFor.join(', ')}.`}
          </p>

          <div className="info-table">
            <div className="info-row">
              <div className="info-label">Giờ mở cửa</div>
              <div className="info-value">
                {restaurant.openingHours ? (
                  <div className="hours-list">
                    {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                      <div key={day} className="hours-item">
                        <span>{day}:</span>
                        <span>
                          {hours.open} - {hours.close}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  '11:00 - 22:00'
                )}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Giá trung bình</div>
              <div className="info-value">{restaurant.averagePrice || restaurant.priceRange}</div>
            </div>
          </div>

          {restaurant.regulations && restaurant.regulations.length > 0 && (
            <div className="regulations-section">
              <h3 className="subsection-title">Quy định</h3>
              <ul className="regulations-list">
                {restaurant.regulations.map((reg, idx) => (
                  <li key={idx} className="regulation-item">
                    {reg}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Menu Section */}
        {restaurant.menuImages && restaurant.menuImages.length > 0 && (
          <div className="menu-section">
            <h2 className="section-title">Thực đơn {restaurant.name}</h2>
            <div className="menu-grid">
              {restaurant.menuImages.map((menuImg, idx) => (
                <div key={idx} className="menu-item">
                  <img src={menuImg} alt={`Menu ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities Section */}
        {restaurant.amenities && (
          <div className="amenities-section">
            <h2 className="section-title">Tiện ích</h2>
            <div className="amenities-grid">
              {Object.entries(restaurant.amenities).map(([key, value]) => {
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
                    <span className={`amenity-icon ${value ? 'available' : 'unavailable'}`}>
                      {value ? '✓' : '✗'}
                    </span>
                    <span className={value ? '' : 'unavailable-text'}>{labels[key]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {restaurant.gallery && restaurant.gallery.length > 0 && (
          <div className="gallery-section">
            <h2 className="section-title">Hình ảnh {restaurant.name}</h2>
            <div className="gallery-grid">
              {restaurant.gallery.map((img, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={img} alt={`${restaurant.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Section */}
        {restaurant.lat && restaurant.lng && (
          <div className="location-section">
            <h2 className="section-title">Chỉ đường</h2>
            {GOOGLE_MAPS_API_KEY ? (
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: restaurant.lat, lng: restaurant.lng }}
                  zoom={15}
                >
                  <Marker position={{ lat: restaurant.lat, lng: restaurant.lng }} />
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="map-placeholder">
                <p>Vui lòng thêm VITE_GOOGLE_MAPS_API_KEY vào file .env</p>
              </div>
            )}
          </div>
        )}

        {/* Operating Hours Table */}
        {restaurant.openingHours && (
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
                {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>
                      {hours.open} - {hours.close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Related Restaurants */}
        {relatedRestaurants.length > 0 && (
          <div className="related-section">
            <h2 className="section-title">Có thể bạn quan tâm</h2>
            <div className="related-grid">
              {relatedRestaurants.map((r) => (
                <div key={r.id} onClick={() => navigate(`/nha-hang/${r.id}`)}>
                  <RestaurantCard restaurant={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;

