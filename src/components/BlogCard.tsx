import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '../data/blogData';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className={`blog-card ${featured ? 'featured' : ''}`} onClick={handleClick}>
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
        <div className="blog-category-badge">{post.category}</div>
      </div>
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          <span className="blog-author">{post.author}</span>
          <span className="blog-date">{formatDate(post.publishDate)}</span>
          <span className="blog-views">{post.views.toLocaleString()} lượt xem</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

