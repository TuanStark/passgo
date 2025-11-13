-- Sample Data for Booking Res Database
-- Run after schema.sql

-- ============================================
-- CITIES
-- ============================================
INSERT INTO cities (id, name, code) VALUES
('city-001', 'Hà Nội', 'HN'),
('city-002', 'Hồ Chí Minh', 'HCM'),
('city-003', 'Đà Nẵng', 'DN');

-- ============================================
-- DISTRICTS
-- ============================================
INSERT INTO districts (id, city_id, name, code) VALUES
-- Hà Nội
('dist-001', 'city-001', 'Quận Hoàn Kiếm', 'HK'),
('dist-002', 'city-001', 'Quận Ba Đình', 'BD'),
('dist-003', 'city-001', 'Quận Hai Bà Trưng', 'HBT'),
('dist-004', 'city-001', 'Quận Đống Đa', 'DD'),
-- Hồ Chí Minh
('dist-005', 'city-002', 'Quận 1', 'Q1'),
('dist-006', 'city-002', 'Quận 2', 'Q2'),
('dist-007', 'city-002', 'Quận 3', 'Q3'),
('dist-008', 'city-002', 'Quận 5', 'Q5');

-- ============================================
-- CUISINE TYPES
-- ============================================
INSERT INTO cuisine_types (id, name, slug) VALUES
('cuisine-001', 'Món Việt', 'mon-viet'),
('cuisine-002', 'Món Nhật', 'mon-nhat'),
('cuisine-003', 'Món Hàn', 'mon-han'),
('cuisine-004', 'Món Thái', 'mon-thai'),
('cuisine-005', 'Món Âu', 'mon-au'),
('cuisine-006', 'Buffet', 'buffet'),
('cuisine-007', 'Lẩu', 'lau'),
('cuisine-008', 'Hải Sản', 'hai-san'),
('cuisine-009', 'Món chay', 'mon-chay'),
('cuisine-010', 'Pizza', 'pizza');

-- ============================================
-- USERS
-- ============================================
INSERT INTO users (id, email, password, name, phone, role) VALUES
('user-001', 'user@example.com', '$2b$10$hashed_password', 'Nguyễn Văn A', '0912345678', 'user'),
('user-002', 'admin@bookingres.vn', '$2b$10$hashed_password', 'Admin User', '0987654321', 'admin');

-- ============================================
-- RESTAURANTS
-- ============================================
INSERT INTO restaurants (id, name, slug, description, address, district_id, city_id, latitude, longitude, phone, price_range, average_price, capacity, has_private_room, is_exclusive, rating, review_count) VALUES
('rest-001', 'Lộc-Ally Restaurant - Cát Linh', 'loc-ally-cat-linh', 'Lộc-Ally Restaurant là một không gian ẩm thực hiện đại, kết hợp tinh hoa ẩm thực Á - Âu.', 'Tầng 2, Khách Sạn Grand Mercure Hanoi, Số 9 Cát Linh, P. Cát Linh', 'dist-004', 'city-001', 21.0075, 105.8442, '0241234567', '200K - 300K', '200.000 - 300.000 VNĐ/người', 100, TRUE, TRUE, 4.0, 234),
('rest-002', 'Sushi Hokkaido Premium', 'sushi-hokkaido-premium', 'Nhà hàng sushi Nhật Bản cao cấp', '123 Nguyễn Huệ, Phường Bến Nghé', 'dist-005', 'city-002', 10.7769, 106.7009, '0281234567', '500K - 1000K', '500.000 - 1.000.000 VNĐ/người', 30, TRUE, FALSE, 4.8, 456);

-- ============================================
-- RESTAURANT CUISINES
-- ============================================
INSERT INTO restaurant_cuisines (restaurant_id, cuisine_id) VALUES
('rest-001', 'cuisine-001'),
('rest-001', 'cuisine-006'),
('rest-002', 'cuisine-002');

-- ============================================
-- RESTAURANT IMAGES
-- ============================================
INSERT INTO restaurant_images (id, restaurant_id, image_url, image_type, display_order) VALUES
('img-001', 'rest-001', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'main', 1),
('img-002', 'rest-001', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', 'gallery', 2),
('img-003', 'rest-002', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 'main', 1);

-- ============================================
-- RESTAURANT AMENITIES
-- ============================================
INSERT INTO restaurant_amenities (id, restaurant_id, wifi, air_conditioning, card_payment, private_room, parking) VALUES
('amen-001', 'rest-001', TRUE, TRUE, TRUE, TRUE, TRUE),
('amen-002', 'rest-002', TRUE, TRUE, TRUE, TRUE, FALSE);

-- ============================================
-- RESTAURANT OPENING HOURS
-- ============================================
INSERT INTO restaurant_opening_hours (id, restaurant_id, day_of_week, open_time, close_time) VALUES
('hour-001', 'rest-001', 'Monday', '11:00:00', '22:00:00'),
('hour-002', 'rest-001', 'Tuesday', '11:00:00', '22:00:00'),
('hour-003', 'rest-001', 'Wednesday', '11:00:00', '22:00:00'),
('hour-004', 'rest-001', 'Thursday', '11:00:00', '22:00:00'),
('hour-005', 'rest-001', 'Friday', '11:00:00', '22:00:00'),
('hour-006', 'rest-001', 'Saturday', '11:00:00', '22:00:00'),
('hour-007', 'rest-001', 'Sunday', '11:00:00', '22:00:00');

-- ============================================
-- RESTAURANT REGULATIONS
-- ============================================
INSERT INTO restaurant_regulations (id, restaurant_id, regulation_text, display_order) VALUES
('reg-001', 'rest-001', 'Áp dụng cho nhóm từ 1 - 10 khách', 1),
('reg-002', 'rest-001', 'Đặt bàn trước ít nhất 2 giờ', 2),
('reg-003', 'rest-001', 'Hủy đặt bàn trước ít nhất 1 giờ', 3);

-- ============================================
-- BLOG CATEGORIES
-- ============================================
INSERT INTO blog_categories (id, name, slug) VALUES
('blog-cat-001', 'Khám phá', 'kham-pha'),
('blog-cat-002', 'Tin tức', 'tin-tuc'),
('blog-cat-003', 'Kinh doanh ăn uống', 'kinh-doanh-an-uong'),
('blog-cat-004', 'Địa Điểm Ăn Uống', 'dia-diem-an-uong'),
('blog-cat-005', 'Món ngon & Công thức', 'mon-ngon-cong-thuc');

-- ============================================
-- BLOG POSTS
-- ============================================
INSERT INTO blog_posts (id, author_id, category_id, title, slug, excerpt, content, featured_image, city_id, views, is_published, published_at) VALUES
('post-001', 'user-002', 'blog-cat-003', '14 cách đặt tên Nhà hàng hay nhất và những điều CẦN TRÁNH tuyệt đối', '14-cach-dat-ten-nha-hang-hay-nhat', 'Đặt tên nhà hàng là một trong những bước quan trọng nhất khi bắt đầu kinh doanh.', 'Full content...', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', 'city-001', 15234, TRUE, NOW()),
('post-002', 'user-002', 'blog-cat-003', 'Bùng nổ doanh số nhờ chiến lược Marketing Nhà Hàng đúng cách', 'bung-no-doanh-so-marketing-nha-hang', 'Marketing nhà hàng hiệu quả là chìa khóa để thu hút khách hàng.', 'Full content...', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600', 'city-001', 12345, TRUE, NOW());

-- ============================================
-- COLLECTIONS
-- ============================================
INSERT INTO collections (id, title, slug, description, image_url, city_id, is_featured) VALUES
('col-001', 'Nhà hàng Buffet nổi tiếng', 'nha-hang-buffet-noi-tieng', 'Khám phá các nhà hàng buffet chất lượng với giá cả hợp lý', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', 'city-001', TRUE),
('col-002', 'Nhà hàng Hải sản tươi sống', 'nha-hang-hai-san-tuoi-song', 'Thưởng thức hải sản tươi ngon nhất tại các nhà hàng uy tín', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', 'city-001', FALSE);

-- ============================================
-- COLLECTION RESTAURANTS
-- ============================================
INSERT INTO collection_restaurants (collection_id, restaurant_id, display_order) VALUES
('col-001', 'rest-001', 1),
('col-002', 'rest-001', 1);

