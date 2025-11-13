import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { restaurantsService } from '../services/restaurants.service';
import { bookingsService } from '../services/bookings.service';
import type { Restaurant } from '../services/restaurants.service';
import type { CreateBookingDto } from '../services/bookings.service';
import './Booking.css';

interface BookingState {
  restaurantId: string;
  restaurantName?: string;
  date?: string;
  time?: string;
  guests?: number;
}

const PAYMENT_METHODS = [
  {
    id: 'pay_at_restaurant',
    title: 'Thanh toán tại nhà hàng',
    description: 'Thanh toán trực tiếp khi dùng bữa. Phù hợp cho mọi loại đặt bàn.',
  },
  {
    id: 'bank_transfer',
    title: 'Chuyển khoản trước',
    description: 'Đặt cọc trước qua chuyển khoản ngân hàng để giữ chỗ chắc chắn.',
  },
  {
    id: 'credit_card',
    title: 'Thanh toán bằng thẻ',
    description: 'Thanh toán nhanh chóng bằng thẻ Visa/Master/JCB.',
  },
];

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const state = location.state as BookingState | undefined;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [bookingDate, setBookingDate] = useState(state?.date || '');
  const [bookingTime, setBookingTime] = useState(state?.time || '');
  const [guests, setGuests] = useState(state?.guests || 2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay_at_restaurant');
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (!state?.restaurantId) {
      navigate('/');
      return;
    }

    const loadRestaurant = async () => {
      try {
        const data = await restaurantsService.getById(state.restaurantId);
        setRestaurant(data);
      } catch (error) {
        console.error('Error loading restaurant for booking:', error);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [state?.restaurantId, navigate]);

  useEffect(() => {
    if (user) {
      setContactInfo((prev) => ({
        fullName: user.name || prev.fullName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isAuthenticated) {
      setErrorMessage('Vui lòng đăng nhập để tiếp tục đặt bàn.');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!restaurant || !bookingDate || !bookingTime || guests <= 0) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin đặt bàn.');
      return;
    }

    if (!contactInfo.fullName || !contactInfo.phone || !contactInfo.email) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin liên hệ.');
      return;
    }

    if (!acceptPolicy) {
      setErrorMessage('Vui lòng đồng ý với điều khoản đặt bàn.');
      return;
    }

    const payload: CreateBookingDto = {
      restaurantId: restaurant.id,
      bookingDate,
      bookingTime,
      numberOfGuests: guests,
      specialRequests: buildSpecialRequest(),
    };

    try {
      setSubmitting(true);
      const booking = await bookingsService.create(payload);
      setSuccessBooking(true);
      setBookingCode(booking.id);
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Đặt bàn thất bại. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildSpecialRequest = () => {
    const contactText = `Thông tin liên hệ: ${contactInfo.fullName} - ${contactInfo.phone} - ${contactInfo.email}`;
    const paymentText = `Phương thức thanh toán: ${PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.title || paymentMethod}`;
    const noteText = specialRequests ? `Ghi chú: ${specialRequests}` : '';
    return [contactText, paymentText, noteText].filter(Boolean).join(' | ');
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <p>Đang tải thông tin đặt bàn...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <p>Không tìm thấy nhà hàng. Vui lòng thử lại.</p>
        </div>
      </div>
    );
  }

  if (successBooking) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-success">
            <div className="success-icon">🎉</div>
            <h1>Đặt bàn thành công!</h1>
            <p>Mã đặt bàn của bạn: <strong>{bookingCode}</strong></p>
            <div className="success-summary">
              <h2>Thông tin đặt bàn</h2>
              <ul>
                <li>
                  <span>Nhà hàng:</span>
                  <span>{restaurant.name}</span>
                </li>
                <li>
                  <span>Ngày:</span>
                  <span>{bookingDate}</span>
                </li>
                <li>
                  <span>Giờ:</span>
                  <span>{bookingTime}</span>
                </li>
                <li>
                  <span>Số khách:</span>
                  <span>{guests} người</span>
                </li>
                <li>
                  <span>Phương thức thanh toán:</span>
                  <span>{PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.title}</span>
                </li>
              </ul>
            </div>
            <div className="success-actions">
              <button className="primary-btn" onClick={() => navigate('/')}>
                Về trang chủ
              </button>
              <button className="secondary-btn" onClick={() => navigate('/an-uong')}>
                Khám phá nhà hàng khác
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Hoàn tất đặt bàn</h1>
          <p>Vui lòng kiểm tra và xác nhận thông tin đặt bàn của bạn.</p>
        </div>

        <div className="booking-layout">
          <div className="booking-main">
            <form onSubmit={handleSubmit} className="booking-form">
              <section className="booking-section">
                <h2>Thông tin đặt bàn</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Ngày *</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={today}
                      max={maxDate}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Giờ *</label>
                    <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required>
                      <option value="">Chọn giờ</option>
                      {['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                          {timeOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Số khách *</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Yêu cầu đặc biệt</label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Ví dụ: Yêu cầu phòng riêng, ghế trẻ em, không gian hút thuốc..."
                    rows={3}
                  />
                </div>
              </section>

              <section className="booking-section">
                <h2>Thông tin liên hệ</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Họ và tên *</label>
                    <input
                      type="text"
                      value={contactInfo.fullName}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Số điện thoại *</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="booking-section">
                <h2>Phương thức thanh toán</h2>
                <div className="payment-methods">
                  {PAYMENT_METHODS.map((method) => (
                    <button type="button" key={method.id} className={`payment-card ${paymentMethod === method.id ? 'active' : ''}`} onClick={() => setPaymentMethod(method.id)}>
                      <div className="payment-card-header">
                        <span className="payment-icon">💳</span>
                        <div className="payment-info">
                          <h3>{method.title}</h3>
                          <p>{method.description}</p>
                        </div>
                      </div>
                      <div className="payment-arrow">{paymentMethod === method.id ? 'Đang chọn' : 'Chọn'}</div>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'credit_card' && (
                  <div className="card-payment-form">
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Số thẻ</label>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
                      </div>
                      <div className="form-field">
                        <label>Chủ thẻ</label>
                        <input type="text" placeholder="Tên in trên thẻ" />
                      </div>
                      <div className="form-field">
                        <label>Ngày hết hạn</label>
                        <input type="text" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="form-field">
                        <label>CVV</label>
                        <input type="password" placeholder="***" maxLength={3} />
                      </div>
                    </div>
                    <p className="card-note">Thông tin thẻ chỉ được sử dụng cho mục đích mô phỏng giao diện thanh toán. Booking Res không lưu trữ dữ liệu thẻ.</p>
                  </div>
                )}
              </section>

              <section className="booking-section policy-section">
                <label className="checkbox">
                  <input type="checkbox" checked={acceptPolicy} onChange={(e) => setAcceptPolicy(e.target.checked)} />
                  <span>
                    Tôi đồng ý với <a href="#">Điều khoản đặt bàn</a> và <a href="#">Chính sách hủy bàn</a> của Booking Res.
                  </span>
                </label>
              </section>

              {errorMessage && <div className="error-message">{errorMessage}</div>}

              <div className="booking-actions">
                <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
                  Quay lại
                </button>
                <button type="submit" className="primary-btn" disabled={submitting}>
                  {submitting ? 'Đang xử lý...' : 'Xác nhận đặt bàn'}
                </button>
              </div>
            </form>
          </div>

          <aside className="booking-summary">
            <div className="summary-card">
              <h2>Thông tin nhà hàng</h2>
              <div className="summary-restaurant">
                <img
                  src={restaurant.images?.find((img) => img.imageType === 'MAIN')?.imageUrl || restaurant.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600'}
                  alt={restaurant.name}
                />
                <div>
                  <h3>{restaurant.name}</h3>
                  <p>
                    {restaurant.address}
                    {restaurant.district?.name ? `, ${restaurant.district.name}` : ''}
                    {restaurant.city?.name ? `, ${restaurant.city.name}` : ''}
                  </p>
                  <p>⭐ {restaurant.rating} ({restaurant.reviewCount} đánh giá)</p>
                </div>
              </div>
              <ul className="summary-list">
                <li>
                  <span>Ngày</span>
                  <strong>{bookingDate || 'Chưa chọn'}</strong>
                </li>
                <li>
                  <span>Giờ</span>
                  <strong>{bookingTime || 'Chưa chọn'}</strong>
                </li>
                <li>
                  <span>Số khách</span>
                  <strong>{guests} người</strong>
                </li>
                <li>
                  <span>Liên hệ</span>
                  <strong>
                    {contactInfo.fullName || 'Chưa nhập'}
                    <br />
                    {contactInfo.phone || ''}
                    <br />
                    {contactInfo.email || ''}
                  </strong>
                </li>
                <li>
                  <span>Thanh toán</span>
                  <strong>{PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.title}</strong>
                </li>
              </ul>
            </div>

            <div className="summary-card info-card">
              <h2>Chính sách đặt bàn</h2>
              <ul>
                <li>Giữ bàn trong vòng 15 phút kể từ thời gian đã đặt.</li>
                <li>Vui lòng thông báo nếu đến trễ hoặc cần hủy ít nhất 1 tiếng trước giờ đặt.</li>
                <li>Phí dịch vụ có thể áp dụng đối với các yêu cầu đặc biệt.</li>
                <li>Đối với đặt bàn số lượng lớn (từ 20 người), Booking Res sẽ liên hệ để xác nhận.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Booking;
