import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    };

    if (showAccountDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountDropdown]);

  const handleAccountClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    
    // If clicking on dropdown toggle icon, toggle dropdown
    if (target.closest('.dropdown-toggle')) {
      setShowAccountDropdown(!showAccountDropdown);
      return;
    }
    
    if (isAuthenticated && user) {
      // If logged in, navigate to profile
      navigate('/profile');
    } else {
      // If not logged in, show dropdown
      setShowAccountDropdown(!showAccountDropdown);
    }
  };

  const handleUserInfoClick = () => {
    navigate('/profile');
    setShowAccountDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <Link to="/">
              <h1>Booking Res</h1>
            </Link>
          </div>
          <nav className="main-nav">
            <Link to="/dia-diem-gan-ban" className="nav-link">
              Gần bạn
            </Link>
            <Link to="/bo-suu-tap" className="nav-link">
              Bộ sưu tập
            </Link>
            <Link to="/an-uong" className="nav-link">
              Ăn uống
            </Link>
            <Link to="/nha-hang-uy-tin" className="nav-link">
              Nhà hàng uy tín
            </Link>
            <Link to="/blog" className="nav-link">
              Tin tức & Blog
            </Link>
          </nav>
          <div className="header-actions">
            <button className="btn-primary">Đặt chỗ</button>
            <div className="hotline">1900 6005</div>
            <div className="account-dropdown" ref={dropdownRef}>
              {isAuthenticated && user ? (
                <button
                  className="account-btn logged-in"
                  onClick={handleAccountClick}
                >
                  <div className="account-user-info">
                    <div className="user-avatar-small">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="account-text">
                      <span className="account-name">{user.name}</span>
                      <span className="account-label">Tài khoản</span>
                    </div>
                  </div>
                  <span className="dropdown-toggle">▼</span>
                </button>
              ) : (
                <button
                  className="account-btn"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  <span className="account-icon">👤</span>
                  <span>Tài khoản</span>
                  <span className="dropdown-toggle">▼</span>
                </button>
              )}
              {showAccountDropdown && (
                <div className="dropdown-menu">
                  {isAuthenticated && user ? (
                    <>
                      <div className="user-info" onClick={handleUserInfoClick} style={{ cursor: 'pointer' }}>
                        <div className="user-avatar">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} />
                          ) : (
                            <span>{user.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                          <div className="view-profile-link">Xem hồ sơ →</div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          navigate('/profile');
                        }}
                      >
                        <span className="dropdown-icon">👤</span>
                        Thông tin tài khoản
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          navigate('/bookings');
                        }}
                      >
                        <span className="dropdown-icon">📅</span>
                        Đơn đặt bàn của tôi
                      </button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        <span className="dropdown-icon">🚪</span>
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          navigate('/login');
                        }}
                      >
                        <span className="dropdown-icon">🔐</span>
                        Đăng nhập
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          navigate('/register');
                        }}
                      >
                        <span className="dropdown-icon">✍️</span>
                        Đăng ký
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {showAccountDropdown && (
        <div
          className="dropdown-overlay"
          onClick={() => setShowAccountDropdown(false)}
        ></div>
      )} */}
    </header>
  );
};

export default Header;
