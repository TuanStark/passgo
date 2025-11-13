# Booking Res Database Schema

Thiết kế database cho nền tảng đặt bàn nhà hàng Booking Res.

## Tổng quan

Database được thiết kế để hỗ trợ các tính năng chính:
- Quản lý người dùng và nhà hàng
- Đặt bàn trực tuyến
- Đánh giá và review
- Blog và tin tức
- Bộ sưu tập nhà hàng
- Tìm kiếm và lọc

## Cấu trúc Database

### 1. Users & Authentication
- **users**: Thông tin người dùng, admin, chủ nhà hàng
- **notifications**: Thông báo cho người dùng

### 2. Locations
- **cities**: Danh sách thành phố
- **districts**: Danh sách quận/huyện theo thành phố

### 3. Restaurants
- **restaurants**: Thông tin nhà hàng chính
- **restaurant_images**: Hình ảnh nhà hàng (main, gallery, menu)
- **restaurant_cuisines**: Loại món ăn (many-to-many)
- **restaurant_amenities**: Tiện ích của nhà hàng
- **restaurant_opening_hours**: Giờ mở cửa theo ngày
- **restaurant_regulations**: Quy định của nhà hàng

### 4. Bookings
- **bookings**: Đơn đặt bàn
  - Status: pending, confirmed, cancelled, completed, no_show

### 5. Reviews & Ratings
- **reviews**: Đánh giá nhà hàng
- **review_images**: Hình ảnh trong review

### 6. Collections
- **collections**: Bộ sưu tập nhà hàng
- **collection_restaurants**: Liên kết nhà hàng với bộ sưu tập

### 7. Blog
- **blog_categories**: Danh mục blog
- **blog_posts**: Bài viết blog
- **blog_tags**: Tags cho blog
- **blog_post_tags**: Liên kết tags với bài viết

### 8. Other Features
- **favorites**: Nhà hàng yêu thích của user
- **promotions**: Khuyến mãi/ưu đãi
- **search_history**: Lịch sử tìm kiếm
- **cuisine_types**: Loại món ăn

## Relationships

```
users (1) ──< (N) bookings
users (1) ──< (N) reviews
users (1) ──< (N) favorites

restaurants (1) ──< (N) bookings
restaurants (1) ──< (N) reviews
restaurants (1) ──< (N) restaurant_images
restaurants (1) ──< (1) restaurant_amenities
restaurants (1) ──< (N) restaurant_opening_hours
restaurants (N) ──< (N) cuisine_types (via restaurant_cuisines)
restaurants (N) ──< (N) collections (via collection_restaurants)

cities (1) ──< (N) districts
cities (1) ──< (N) restaurants
cities (1) ──< (N) blog_posts

blog_categories (1) ──< (N) blog_posts
blog_posts (N) ──< (N) blog_tags (via blog_post_tags)
```

## Indexes

Các indexes quan trọng đã được tạo để tối ưu hiệu suất:
- Email, phone cho users
- Slug cho restaurants, blog_posts
- Location (latitude, longitude) cho restaurants
- Rating, review_count cho restaurants
- Date, status cho bookings
- Published date cho blog_posts

## Sample Data

Có thể sử dụng mock data từ:
- `src/data/mockData.ts` - Restaurants, locations
- `src/data/userData.ts` - Users
- `src/data/blogData.ts` - Blog posts

## Migration Notes

1. Tạo database trước:
```sql
CREATE DATABASE booking_res CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE booking_res;
```

2. Chạy schema.sql để tạo tables

3. Import sample data (nếu có)

## Technology Stack

- Database: MySQL 8.0+ hoặc PostgreSQL 12+
- Character Set: UTF8MB4 (cho tiếng Việt)
- UUID cho primary keys

