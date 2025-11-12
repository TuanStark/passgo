import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Đặt chỗ & Ưu đãi</h3>
            <p>
              Booking Res là nền tảng đặt chỗ trực tuyến, giúp thực khách tìm kiếm và
              lựa chọn nhà hàng đúng ý gần nhất. Với các đối tác nhà hàng sẽ dễ
              dàng và hiệu quả hơn để tăng doanh số, hiệu suất bán hàng!
            </p>
          </div>

          <div className="footer-section">
            <h3>Giới thiệu</h3>
            <ul>
              <li>Tổng quan về nền tảng Booking Res</li>
              <li>Hướng dẫn đặt chỗ</li>
              <li>Câu hỏi thường gặp khi đặt chỗ</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Tiện ích</h3>
            <ul>
              <li>Địa điểm gần bạn</li>
              <li>Tìm kiếm ngay</li>
              <li>Ưu đãi đang Hot</li>
              <li>Khám phá các Bộ sưu tập</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Dành cho Kinh doanh</h3>
            <ul>
              <li>Trung tâm hỗ trợ Đối tác</li>
              <li>Hướng dẫn nhà hàng hợp tác</li>
              <li>Nhà hàng đăng ký hợp tác</li>
              <li>Liên hệ về Đầu tư & Hợp tác</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <h4>Thông tin doanh nghiệp</h4>
            <p>
              Địa chỉ: Tầng 9, Tòa Minori, Số 67A Trương Định, Phường Trương
              Định, Quận Hai Bà Trưng, Hà Nội
            </p>
            <p>Hotline: 1900 6005 | Email: CSKH@bookingres.vn</p>
            <p>Mã số thuế: 0106329034</p>
          </div>
          <div className="footer-copyright">
            <p>© Copyright 2025 Booking Res, All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

