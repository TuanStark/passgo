import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersService, type User } from '../services/users.service';
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    bookingsCount: 0,
    reviewsCount: 0,
    favoritesCount: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await usersService.getProfile();
        // Backend returns user with stats
        if ((profile as any).stats) {
          setStats((profile as any).stats);
          const { stats, ...userData } = profile as any;
          setUser(userData);
        } else {
          setUser(profile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <div className="error-state">
            <p>Không thể tải thông tin người dùng</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <div className="page-header">
          <h1>Thông tin tài khoản</h1>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            {user.phone && <p className="profile-phone">{user.phone}</p>}

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{stats.bookingsCount}</div>
                <div className="stat-label">Đơn đặt bàn</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.reviewsCount}</div>
                <div className="stat-label">Đánh giá</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.favoritesCount}</div>
                <div className="stat-label">Yêu thích</div>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <h3>Thông tin cá nhân</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Họ và tên</label>
                  <div className="info-value">{user.name}</div>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <div className="info-value">{user.email}</div>
                  {user.emailVerified && (
                    <span className="verified-badge">✓ Đã xác thực</span>
                  )}
                </div>
                {user.phone && (
                  <div className="info-item">
                    <label>Số điện thoại</label>
                    <div className="info-value">{user.phone}</div>
                  </div>
                )}
                <div className="info-item">
                  <label>Vai trò</label>
                  <div className="info-value">
                    {user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Thống kê hoạt động</h3>
              <div className="activity-stats">
                <div className="activity-card">
                  <div className="activity-icon">📅</div>
                  <div className="activity-info">
                    <div className="activity-value">{stats.bookingsCount}</div>
                    <div className="activity-label">Đơn đặt bàn</div>
                  </div>
                  <button
                    className="activity-link"
                    onClick={() => navigate('/bookings')}
                  >
                    Xem tất cả →
                  </button>
                </div>
                <div className="activity-card">
                  <div className="activity-icon">⭐</div>
                  <div className="activity-info">
                    <div className="activity-value">{stats.reviewsCount}</div>
                    <div className="activity-label">Đánh giá</div>
                  </div>
                </div>
                <div className="activity-card">
                  <div className="activity-icon">❤️</div>
                  <div className="activity-info">
                    <div className="activity-value">{stats.favoritesCount}</div>
                    <div className="activity-label">Nhà hàng yêu thích</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

