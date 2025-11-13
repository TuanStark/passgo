import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate('/');
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
            {/* <a href="#videos" className="nav-link">
              Video Booking Res
            </a> */}
          </nav>
          <div className="header-actions">
            <button className="btn-primary">Đặt chỗ</button>
            <div className="hotline">1900 6005</div>
            <div className="account-dropdown">
              <button
                className="account-btn"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                <span>👤</span>
                <span>Tài khoản</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showAccountDropdown && (
                <div className="dropdown-menu">
                  {isAuthenticated && user ? (
                    <>
                      <div className="user-info">
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
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAccountDropdown(false);
                          navigate('/profile');
                        }}
                      >
                        Thông tin tài khoản
                      </Link>
                      <Link
                        to="/bookings"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAccountDropdown(false);
                          navigate('/bookings');
                        }}
                      >
                        Đơn đặt bàn của tôi
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAccountDropdown(false);
                          navigate('/login');
                        }}
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAccountDropdown(false);
                          navigate('/register');
                        }}
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAccountDropdown && (
        <div
          className="dropdown-overlay"
          onClick={() => setShowAccountDropdown(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
