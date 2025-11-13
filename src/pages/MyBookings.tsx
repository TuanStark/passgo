import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingsService, type Booking } from '../services/bookings.service';
import './MyBookings.css';

function MyBookings() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadBookings = async () => {
      try {
        // Use bookingsService.getAll() which automatically filters by current user via JWT
        const data = await bookingsService.getAll();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [isAuthenticated, navigate]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn đặt bàn này?')) {
      return;
    }

    try {
      await bookingsService.cancel(bookingId);
      // Reload bookings
      const data = await bookingsService.getAll();
      setBookings(Array.isArray(data) ? data : []);
      alert('Hủy đơn đặt bàn thành công!');
    } catch (error: any) {
      alert(`Hủy đơn đặt bàn thất bại: ${error.message || 'Lỗi không xác định'}`);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Chờ xác nhận',
      CONFIRMED: 'Đã xác nhận',
      COMPLETED: 'Hoàn thành',
      CANCELLED: 'Đã hủy',
      NO_SHOW: 'Không đến',
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      PENDING: 'status-pending',
      CONFIRMED: 'status-confirmed',
      COMPLETED: 'status-completed',
      CANCELLED: 'status-cancelled',
      NO_SHOW: 'status-no-show',
    };
    return classes[status] || '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    // Handle both DateTime and Time string formats
    if (timeString.includes('T')) {
      const date = new Date(timeString);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
    return timeString.substring(0, 5); // HH:mm
  };

  const getRestaurantAddress = (booking: Booking) => {
    if (!booking.restaurant) return '';
    const parts = [];
    if (booking.restaurant.address) parts.push(booking.restaurant.address);
    if (booking.restaurant.district?.name) parts.push(booking.restaurant.district.name);
    if (booking.restaurant.city?.name) parts.push(booking.restaurant.city.name);
    return parts.join(', ') || '';
  };

  const getRestaurantImage = (booking: Booking) => {
    return booking.restaurant?.images?.[0]?.imageUrl || 
           'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400';
  };

  const filteredBookings = bookings.filter(
    (booking) => filter === 'all' || booking.status === filter,
  );

  if (loading) {
    return (
      <div className="my-bookings-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải đơn đặt bàn...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1>Đơn đặt bàn của tôi</h1>
          <p>Quản lý và theo dõi các đơn đặt bàn của bạn</p>
        </div>

        <div className="bookings-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            Chờ xác nhận ({bookings.filter((b) => b.status === 'PENDING').length})
          </button>
          <button
            className={`filter-btn ${filter === 'CONFIRMED' ? 'active' : ''}`}
            onClick={() => setFilter('CONFIRMED')}
          >
            Đã xác nhận ({bookings.filter((b) => b.status === 'CONFIRMED').length})
          </button>
          <button
            className={`filter-btn ${filter === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => setFilter('COMPLETED')}
          >
            Hoàn thành ({bookings.filter((b) => b.status === 'COMPLETED').length})
          </button>
          <button
            className={`filter-btn ${filter === 'CANCELLED' ? 'active' : ''}`}
            onClick={() => setFilter('CANCELLED')}
          >
            Đã hủy ({bookings.filter((b) => b.status === 'CANCELLED').length})
          </button>
        </div>

        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <div className="no-bookings-icon">📅</div>
              <h3>Chưa có đơn đặt bàn nào</h3>
              <p>
                {filter === 'all'
                  ? 'Bạn chưa có đơn đặt bàn nào. Hãy khám phá các nhà hàng và đặt bàn ngay!'
                  : `Không có đơn đặt bàn với trạng thái "${getStatusLabel(filter)}"`}
              </p>
              {filter === 'all' && (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/')}
                >
                  Khám phá nhà hàng
                </button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-restaurant-info">
                    <div className="booking-restaurant-image">
                      <img src={getRestaurantImage(booking)} alt={booking.restaurant?.name || 'Nhà hàng'} />
                    </div>
                    <div className="booking-restaurant">
                      <h3>{booking.restaurant?.name || 'Nhà hàng'}</h3>
                      <p className="booking-address">
                        {getRestaurantAddress(booking)}
                      </p>
                    </div>
                  </div>
                  <div className={`booking-status ${getStatusClass(booking.status)}`}>
                    {getStatusLabel(booking.status)}
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <span className="detail-label">📅 Ngày đặt:</span>
                    <span className="detail-value">{formatDate(booking.bookingDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🕐 Giờ đặt:</span>
                    <span className="detail-value">{formatTime(booking.bookingTime)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">👥 Số khách:</span>
                    <span className="detail-value">{booking.numberOfGuests} người</span>
                  </div>
                  {booking.specialRequests && (
                    <div className="detail-item">
                      <span className="detail-label">💬 Yêu cầu đặc biệt:</span>
                      <span className="detail-value">{booking.specialRequests}</span>
                    </div>
                  )}
                  {booking.cancellationReason && (
                    <div className="detail-item">
                      <span className="detail-label">❌ Lý do hủy:</span>
                      <span className="detail-value">{booking.cancellationReason}</span>
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  {booking.restaurant?.id && (
                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/nha-hang/${booking.restaurant?.id}`)}
                    >
                      Xem nhà hàng
                    </button>
                  )}
                  {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                    <button
                      className="btn-danger"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;

