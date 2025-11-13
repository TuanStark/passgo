import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ tên');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return false;
    }

    if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Đăng ký</h1>
            <p>Tạo tài khoản mới trên Booking Res</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  Tôi đồng ý với{' '}
                  <Link to="/terms" className="terms-link">
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link to="/privacy" className="terms-link">
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          {/* <div className="auth-divider">
            <span>Hoặc</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              <span>🔍</span>
              Đăng ký với Google
            </button>
            <button className="social-btn facebook-btn">
              <span>📘</span>
              Đăng ký với Facebook
            </button>
          </div> */}

          <div className="auth-footer">
            <p>
              Đã có tài khoản?{' '}
              <Link to="/login" className="auth-link">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

