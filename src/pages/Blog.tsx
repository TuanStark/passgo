import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts, blogCategories, type BlogCategory } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/mockData';
import './Blog.css';

function Blog() {
  const { city } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'Tất cả'>('Tất cả');

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (city) {
      filtered = filtered.filter((post) => !post.city || post.city === city);
    }

    return filtered;
  }, [selectedCategory, city]);

  // Get most viewed posts (this month)
  const mostViewedPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 6);
  }, []);

  // Get latest posts
  const latestPosts = useMemo(() => {
    return [...filteredPosts]
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 12);
  }, [filteredPosts]);

  // Get top restaurants for sidebar
  const topRestaurants = restaurants.slice(0, 5);

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>Blogs Booking Res | Tin tức ẩm thực, công thức nấu ăn, địa điểm ăn uống nhà hàng quán ăn</h1>
        </div>

        {/* Categories Filter */}
        <div className="categories-section">
          <div className="categories-list">
            {['Tất cả', ...blogCategories].map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category as BlogCategory | 'Tất cả')}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-layout">
          {/* Main Content */}
          <div className="blog-main">
            {/* Most Viewed Section */}
            <section className="blog-section">
              <h2 className="section-title">Xem nhiều nhất tháng</h2>
              <div className="blog-grid">
                {mostViewedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Latest Posts Section */}
            <section className="blog-section">
              <div className="section-header">
                <h2 className="section-title">Bài Blog mới nhất</h2>
                <button className="view-more-btn">Xem thêm</button>
              </div>
              <div className="blog-grid">
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Top nhà hàng ăn ngon</h3>
              <div className="sidebar-restaurants">
                {topRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="sidebar-restaurant-item">
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Blog;

