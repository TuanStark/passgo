-- Common Queries for Booking Res
-- Useful SQL queries for the application

-- ============================================
-- RESTAURANT QUERIES
-- ============================================

-- Get restaurants by city with full details
SELECT 
    r.id,
    r.name,
    r.slug,
    r.address,
    r.rating,
    r.review_count,
    r.price_range,
    r.average_price,
    c.name AS city_name,
    d.name AS district_name,
    GROUP_CONCAT(ct.name SEPARATOR ', ') AS cuisines
FROM restaurants r
LEFT JOIN cities c ON r.city_id = c.id
LEFT JOIN districts d ON r.district_id = d.id
LEFT JOIN restaurant_cuisines rc ON r.id = rc.restaurant_id
LEFT JOIN cuisine_types ct ON rc.cuisine_id = ct.id
WHERE r.city_id = 'city-001' AND r.is_active = TRUE
GROUP BY r.id
ORDER BY r.rating DESC, r.review_count DESC;

-- Get restaurant details with all related data
SELECT 
    r.*,
    c.name AS city_name,
    d.name AS district_name,
    GROUP_CONCAT(DISTINCT ct.name) AS cuisines,
    GROUP_CONCAT(DISTINCT ri.image_url) AS images
FROM restaurants r
LEFT JOIN cities c ON r.city_id = c.id
LEFT JOIN districts d ON r.district_id = d.id
LEFT JOIN restaurant_cuisines rc ON r.id = rc.restaurant_id
LEFT JOIN cuisine_types ct ON rc.cuisine_id = ct.id
LEFT JOIN restaurant_images ri ON r.id = ri.restaurant_id
WHERE r.slug = 'loc-ally-cat-linh'
GROUP BY r.id;

-- Get restaurants near a location (within radius)
SELECT 
    r.id,
    r.name,
    r.address,
    r.rating,
    (
        6371 * acos(
            cos(radians(21.0285)) * 
            cos(radians(r.latitude)) * 
            cos(radians(r.longitude) - radians(105.8542)) + 
            sin(radians(21.0285)) * 
            sin(radians(r.latitude))
        )
    ) AS distance_km
FROM restaurants r
WHERE r.latitude IS NOT NULL 
    AND r.longitude IS NOT NULL
    AND r.is_active = TRUE
HAVING distance_km < 5
ORDER BY distance_km ASC
LIMIT 20;

-- ============================================
-- BOOKING QUERIES
-- ============================================

-- Get user bookings
SELECT 
    b.*,
    r.name AS restaurant_name,
    r.address AS restaurant_address,
    r.phone AS restaurant_phone
FROM bookings b
JOIN restaurants r ON b.restaurant_id = r.id
WHERE b.user_id = 'user-001'
ORDER BY b.booking_date DESC, b.booking_time DESC;

-- Get restaurant bookings for a date
SELECT 
    b.*,
    u.name AS user_name,
    u.phone AS user_phone
FROM bookings b
JOIN users u ON b.user_id = u.id
WHERE b.restaurant_id = 'rest-001'
    AND b.booking_date = '2025-01-20'
    AND b.status IN ('pending', 'confirmed')
ORDER BY b.booking_time ASC;

-- ============================================
-- REVIEW QUERIES
-- ============================================

-- Get restaurant reviews with user info
SELECT 
    rv.*,
    u.name AS user_name,
    u.avatar AS user_avatar
FROM reviews rv
JOIN users u ON rv.user_id = u.id
WHERE rv.restaurant_id = 'rest-001'
ORDER BY rv.created_at DESC
LIMIT 10;

-- Calculate restaurant average rating
SELECT 
    restaurant_id,
    AVG(rating) AS avg_rating,
    COUNT(*) AS total_reviews,
    AVG(food_rating) AS avg_food_rating,
    AVG(service_rating) AS avg_service_rating,
    AVG(ambiance_rating) AS avg_ambiance_rating
FROM reviews
WHERE restaurant_id = 'rest-001'
GROUP BY restaurant_id;

-- ============================================
-- COLLECTION QUERIES
-- ============================================

-- Get collection with restaurants
SELECT 
    c.*,
    city.name AS city_name,
    GROUP_CONCAT(
        CONCAT(r.id, ':', r.name, ':', r.rating)
        SEPARATOR '|'
    ) AS restaurants
FROM collections c
LEFT JOIN cities city ON c.city_id = city.id
LEFT JOIN collection_restaurants cr ON c.id = cr.collection_id
LEFT JOIN restaurants r ON cr.restaurant_id = r.id
WHERE c.id = 'col-001'
GROUP BY c.id;

-- ============================================
-- BLOG QUERIES
-- ============================================

-- Get blog posts by category
SELECT 
    bp.*,
    bc.name AS category_name,
    u.name AS author_name,
    city.name AS city_name,
    GROUP_CONCAT(bt.name) AS tags
FROM blog_posts bp
LEFT JOIN blog_categories bc ON bp.category_id = bc.id
LEFT JOIN users u ON bp.author_id = u.id
LEFT JOIN cities city ON bp.city_id = city.id
LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
LEFT JOIN blog_tags bt ON bpt.tag_id = bt.id
WHERE bp.is_published = TRUE
    AND (bp.category_id = 'blog-cat-003' OR bp.category_id IS NULL)
GROUP BY bp.id
ORDER BY bp.published_at DESC
LIMIT 10;

-- Get most viewed blog posts
SELECT 
    id,
    title,
    slug,
    excerpt,
    featured_image,
    views,
    published_at
FROM blog_posts
WHERE is_published = TRUE
ORDER BY views DESC
LIMIT 6;

-- ============================================
-- SEARCH QUERIES
-- ============================================

-- Search restaurants by name or address
SELECT 
    r.*,
    c.name AS city_name,
    d.name AS district_name
FROM restaurants r
LEFT JOIN cities c ON r.city_id = c.id
LEFT JOIN districts d ON r.district_id = d.id
WHERE (
    r.name LIKE '%buffet%' 
    OR r.address LIKE '%buffet%'
    OR r.description LIKE '%buffet%'
)
AND r.is_active = TRUE
ORDER BY r.rating DESC
LIMIT 20;

-- ============================================
-- STATISTICS QUERIES
-- ============================================

-- Restaurant statistics
SELECT 
    COUNT(*) AS total_restaurants,
    COUNT(CASE WHEN is_verified = TRUE THEN 1 END) AS verified_restaurants,
    AVG(rating) AS avg_rating,
    SUM(review_count) AS total_reviews
FROM restaurants
WHERE is_active = TRUE;

-- Booking statistics by status
SELECT 
    status,
    COUNT(*) AS count,
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM bookings) AS percentage
FROM bookings
GROUP BY status;

-- ============================================
-- UPDATE QUERIES
-- ============================================

-- Update restaurant rating after new review
UPDATE restaurants r
SET 
    rating = (
        SELECT AVG(rating) 
        FROM reviews 
        WHERE restaurant_id = r.id
    ),
    review_count = (
        SELECT COUNT(*) 
        FROM reviews 
        WHERE restaurant_id = r.id
    )
WHERE r.id = 'rest-001';

