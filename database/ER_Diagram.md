# ER Diagram - Booking Res Database

## Entity Relationship Diagram

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ password        │
│ name            │
│ phone           │
│ avatar          │
│ role            │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────▼────────────┐
    │   BOOKINGS      │
    ├─────────────────┤
    │ id (PK)         │
    │ user_id (FK)    │──┐
    │ restaurant_id  │──┼──┐
    │ booking_date   │  │  │
    │ booking_time   │  │  │
    │ guests         │  │  │
    │ status         │  │  │
    └────────────────┘  │  │
                        │  │
┌─────────────────┐    │  │
│  RESTAURANTS    │    │  │
├─────────────────┤    │  │
│ id (PK)         │◄───┘  │
│ name            │       │
│ address         │       │
│ city_id (FK)    │       │
│ district_id(FK) │       │
│ lat/lng         │       │
│ rating          │       │
└────────┬────────┘       │
         │                │
         │ 1:N            │
    ┌────▼────────────┐   │
    │    REVIEWS      │   │
    ├─────────────────┤   │
    │ id (PK)         │   │
    │ user_id (FK)    │───┘
    │ restaurant_id   │───┐
    │ booking_id (FK) │   │
    │ rating          │   │
    │ comment         │   │
    └─────────────────┘   │
                          │
┌─────────────────┐      │
│   COLLECTIONS   │      │
├─────────────────┤      │
│ id (PK)         │      │
│ title           │      │
│ city_id (FK)    │      │
└────────┬────────┘      │
         │               │
         │ N:M           │
    ┌────▼───────────────┘
    │ COLLECTION_RESTAURANTS
    ├───────────────────────
    │ collection_id (FK)
    │ restaurant_id (FK)
    └───────────────────────

┌─────────────────┐
│  BLOG_POSTS     │
├─────────────────┤
│ id (PK)         │
│ author_id (FK)  │──┐
│ category_id(FK) │  │
│ title           │  │
│ content         │  │
│ views           │  │
└─────────────────┘  │
                     │
                     │
┌─────────────────┐  │
│  BLOG_CATEGORIES│  │
├─────────────────┤  │
│ id (PK)         │  │
│ name            │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│     USERS       │──┘
│ (author)        │
└─────────────────┘
```

## Key Relationships

1. **Users → Bookings**: Một user có thể có nhiều bookings
2. **Restaurants → Bookings**: Một nhà hàng có thể có nhiều bookings
3. **Users → Reviews**: Một user có thể viết nhiều reviews
4. **Restaurants → Reviews**: Một nhà hàng có thể có nhiều reviews
5. **Restaurants ↔ Collections**: Many-to-Many relationship
6. **Restaurants ↔ Cuisine Types**: Many-to-Many relationship
7. **Blog Posts → Categories**: Many-to-One relationship
8. **Blog Posts ↔ Tags**: Many-to-Many relationship

## Indexes Strategy

- **Primary Keys**: Tất cả tables sử dụng UUID
- **Foreign Keys**: Indexed để tối ưu JOIN queries
- **Search Fields**: Email, phone, slug được indexed
- **Location Queries**: Latitude/Longitude indexed cho geospatial queries
- **Rating/Sorting**: Rating, review_count, views indexed cho sorting

## Performance Considerations

1. **Pagination**: Sử dụng LIMIT/OFFSET hoặc cursor-based pagination
2. **Caching**: Cache popular restaurants, collections, blog posts
3. **Full-text Search**: Có thể thêm FULLTEXT index cho search
4. **Partitioning**: Có thể partition bookings table theo date nếu data lớn
5. **Read Replicas**: Sử dụng read replicas cho read-heavy queries

