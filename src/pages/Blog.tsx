import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { blogService, type BlogPost, type BlogCategory } from '../services/blog.service';
import { restaurantsService, type Restaurant } from '../services/restaurants.service';
import BlogCard from '../components/BlogCard';
import RestaurantCard from '../components/RestaurantCard';
import './Blog.css';

function Blog() {
  const { city } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string | 'Tất cả'>('Tất cả');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [mostViewedPosts, setMostViewedPosts] = useState<BlogPost[]>([]);
  const [topRestaurants, setTopRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await blogService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  // Load most viewed posts
  useEffect(() => {
    const loadMostViewed = async () => {
      try {
        const data = await blogService.getMostViewed(6);
        setMostViewedPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading most viewed posts:', error);
        setMostViewedPosts([]);
      }
    };
    loadMostViewed();
  }, []);

  // Load top restaurants for sidebar
  useEffect(() => {
    const loadTopRestaurants = async () => {
      try {
        const data = await restaurantsService.getTrusted();
        setTopRestaurants(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error('Error loading top restaurants:', error);
        setTopRestaurants([]);
      }
    };
    loadTopRestaurants();
  }, []);

  // Load posts based on selected category and city
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const categoryId = selectedCategory !== 'Tất cả' ? selectedCategory : undefined;
        // TODO: Map city name to cityId if needed
        const cityId = city ? undefined : undefined; // For now, we'll filter client-side if needed
        const posts = await blogService.getAll({ categoryId, cityId, limit: 50 });
        setAllPosts(Array.isArray(posts) ? posts : []);
      } catch (error) {
        console.error('Error loading posts:', error);
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [selectedCategory, city]);

  // Filter posts by category (client-side if needed)
  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts];

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter((post) => post.category?.id === selectedCategory);
    }

    if (city) {
      filtered = filtered.filter((post) => !post.city || post.city.name === city);
    }

    return filtered;
  }, [allPosts, selectedCategory, city]);

  // Get latest posts
  const latestPosts = useMemo(() => {
    return [...filteredPosts]
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
      .slice(0, 12);
  }, [filteredPosts]);


  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>Blogs Booking Res | Tin tức ẩm thực, công thức nấu ăn, địa điểm ăn uống nhà hàng quán ăn</h1>
        </div>

        {/* Categories Filter */}
        <div className="categories-section">
          <div className="categories-list">
            <button
              key="all"
              className={`category-btn ${selectedCategory === 'Tất cả' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('Tất cả')}
            >
              Tất cả
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-layout">
          {/* Main Content */}
          <div className="blog-main">
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              <>
                {/* Most Viewed Section */}
                <section className="blog-section">
                  <h2 className="section-title">Xem nhiều nhất tháng</h2>
                  <div className="blog-grid">
                    {mostViewedPosts.length > 0 ? (
                      mostViewedPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))
                    ) : (
                      <p>Chưa có bài viết nào</p>
                    )}
                  </div>
                </section>

                {/* Latest Posts Section */}
                <section className="blog-section">
                  <div className="section-header">
                    <h2 className="section-title">Bài Blog mới nhất</h2>
                    <button className="view-more-btn">Xem thêm</button>
                  </div>
                  <div className="blog-grid">
                    {latestPosts.length > 0 ? (
                      latestPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))
                    ) : (
                      <p>Chưa có bài viết nào</p>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Sidebar */}
          {/* TODO: Load top restaurants from API */}
          <aside className="blog-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Top nhà hàng ăn ngon</h3>
              <div className="sidebar-restaurants">
                {topRestaurants.length > 0 ? (
                  topRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="sidebar-restaurant-item">
                      <RestaurantCard restaurant={restaurant} />
                    </div>
                  ))
                ) : (
                  <p>Đang tải nhà hàng...</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Blog;

