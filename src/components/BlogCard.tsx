import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '../services/blog.service';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const imageUrl = post.featuredImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600';
  const categoryName = post.category?.name || '';
  const authorName = post.author?.name || 'Booking Res Team';
  const publishDate = post.publishedAt || post.createdAt;
  const excerpt = post.excerpt || '';

  return (
    <div className={`blog-card ${featured ? 'featured' : ''}`} onClick={handleClick}>
      <div className="blog-image">
        <img src={imageUrl} alt={post.title} />
        {categoryName && (
          <div className="blog-category-badge">{categoryName}</div>
        )}
      </div>
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        {excerpt && <p className="blog-excerpt">{excerpt}</p>}
        <div className="blog-meta">
          <span className="blog-author">{authorName}</span>
          <span className="blog-date">{formatDate(publishDate)}</span>
          <span className="blog-views">{post.views.toLocaleString()} lượt xem</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag.id} className="blog-tag">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

