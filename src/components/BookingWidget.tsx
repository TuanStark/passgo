import { useState } from 'react';
import './BookingWidget.css';

interface BookingWidgetProps {
  restaurantName: string;
  onBook: (bookingData: {
    date: string;
    time: string;
    guests: number;
  }) => void;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ restaurantName, onBook }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time && guests > 0) {
      onBook({ date, time, guests });
    }
  };

  return (
    <div className="booking-widget">
      <h3 className="booking-title">Đặt bàn</h3>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="booking-field">
          <label>Ngày</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            max={maxDateStr}
            required
          />
        </div>

        <div className="booking-field">
          <label>Giờ</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Chọn giờ</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
          </select>
        </div>

        <div className="booking-field">
          <label>Số người</label>
          <div className="guest-selector">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="guest-btn"
            >
              −
            </button>
            <span className="guest-count">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(20, guests + 1))}
              className="guest-btn"
            >
              +
            </button>
          </div>
        </div>

        <button type="submit" className="booking-submit-btn">
          Đặt bàn
        </button>
      </form>
    </div>
  );
};

export default BookingWidget;

