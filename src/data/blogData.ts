export type BlogCategory =
  | 'Khám phá'
  | 'Tin tức'
  | 'Kinh doanh ăn uống'
  | 'Địa Điểm Ăn Uống'
  | 'Tiệc & Tổ chức tiệc'
  | 'Món ngon & Công thức'
  | 'Đặc sản vùng miền'
  | 'Dinh dưỡng'
  | 'Sức khỏe & Làm đẹp'
  | 'Bên lề ẩm thực';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  publishDate: string;
  image: string;
  views: number;
  city?: string;
  tags?: string[];
};

export const blogCategories: BlogCategory[] = [
  'Khám phá',
  'Tin tức',
  'Kinh doanh ăn uống',
  'Địa Điểm Ăn Uống',
  'Tiệc & Tổ chức tiệc',
  'Món ngon & Công thức',
  'Đặc sản vùng miền',
  'Dinh dưỡng',
  'Sức khỏe & Làm đẹp',
  'Bên lề ẩm thực',
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '14 cách đặt tên Nhà hàng hay nhất và những điều CẦN TRÁNH tuyệt đối',
    excerpt:
      'Đặt tên nhà hàng là một trong những bước quan trọng nhất khi bắt đầu kinh doanh. Tên nhà hàng không chỉ là danh tính mà còn là yếu tố quyết định đến sự thành công của bạn.',
    content: 'Full content here...',
    category: 'Kinh doanh ăn uống',
    author: 'Booking Res Team',
    publishDate: '2025-07-02',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    views: 15234,
    city: 'Hà Nội',
    tags: ['Kinh doanh nhà hàng', 'Mẹo vặt'],
  },
  {
    id: '2',
    title: 'Bùng nổ doanh số nhờ chiến lược Marketing Nhà Hàng đúng cách - Booking Res',
    excerpt:
      'Marketing nhà hàng hiệu quả là chìa khóa để thu hút khách hàng và tăng doanh thu. Hãy cùng tìm hiểu các chiến lược marketing hiện đại nhất.',
    content: 'Full content here...',
    category: 'Kinh doanh ăn uống',
    author: 'Booking Res Team',
    publishDate: '2025-07-10',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    views: 12345,
    city: 'Hà Nội',
    tags: ['Marketing', 'Kinh doanh nhà hàng'],
  },
  {
    id: '3',
    title: 'Booking Res là gì - Các cách thức hợp tác với Booking Res',
    excerpt:
      'Booking Res là nền tảng đặt chỗ trực tuyến hàng đầu Việt Nam. Tìm hiểu về các gói dịch vụ và cách thức hợp tác với Booking Res.',
    content: 'Full content here...',
    category: 'Tin tức',
    author: 'Booking Res Team',
    publishDate: '2025-08-21',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    views: 9876,
    city: 'Hà Nội',
    tags: ['Liên hệ hợp tác', 'Kinh doanh nhà hàng'],
  },
  {
    id: '4',
    title: 'Tổng hợp 30+ các quán BUFFET Hà Nội ngon kèm ƯU ĐÃI hấp dẫn nhất',
    excerpt:
      'Khám phá danh sách các nhà hàng buffet ngon nhất tại Hà Nội với nhiều ưu đãi hấp dẫn. Từ buffet hải sản đến buffet lẩu nướng.',
    content: 'Full content here...',
    category: 'Địa Điểm Ăn Uống',
    author: 'Booking Res Team',
    publishDate: '2025-07-15',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    views: 18765,
    city: 'Hà Nội',
    tags: ['Buffet', 'Địa điểm ăn uống'],
  },
  {
    id: '5',
    title: 'TOP các quán lẩu ngon Hà Nội được yêu thích nhất - Xem ƯU ĐÃI mới nhất',
    excerpt:
      'Danh sách các quán lẩu ngon nhất Hà Nội với đa dạng phong cách từ lẩu Thái, lẩu băng chuyền đến lẩu nướng.',
    content: 'Full content here...',
    category: 'Địa Điểm Ăn Uống',
    author: 'Booking Res Team',
    publishDate: '2025-07-20',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    views: 14567,
    city: 'Hà Nội',
    tags: ['Lẩu', 'Địa điểm ăn uống'],
  },
  {
    id: '6',
    title: 'Cách làm thiệp 20/11 SÁNG TẠO, đơn giản bằng thiệp 3D tự làm tặng thầy cô',
    excerpt:
      'Hướng dẫn chi tiết cách làm thiệp 20/11 sáng tạo với thiệp 3D đơn giản, đẹp mắt để tặng thầy cô nhân ngày Nhà giáo Việt Nam.',
    content: 'Full content here...',
    category: 'Món ngon & Công thức',
    author: 'Booking Res Team',
    publishDate: '2025-11-11',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    views: 8765,
    city: 'Hà Nội',
    tags: ['Mẹo vặt gia đình', 'Công thức hot'],
  },
  {
    id: '7',
    title: '35+ bài thơ 20/11 VIẾT THIỆP tặng thầy cô bày tỏ lòng biết ơn hay nhất 2025',
    excerpt:
      'Tổng hợp các bài thơ 20/11 hay và ý nghĩa nhất để viết thiệp tặng thầy cô, bày tỏ lòng biết ơn trong ngày Nhà giáo Việt Nam.',
    content: 'Full content here...',
    category: 'Bên lề ẩm thực',
    author: 'Booking Res Team',
    publishDate: '2025-11-11',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    views: 11234,
    city: 'Hà Nội',
    tags: ['Mẹo vặt gia đình'],
  },
  {
    id: '8',
    title: 'Tổng hợp mẫu cắm hoa 20/11 ĐƠN GIẢN ý nghĩa đến ĐỘC ĐÁO ĐOẠT GIẢI các năm',
    excerpt:
      'Các mẫu cắm hoa 20/11 từ đơn giản đến độc đáo, từng đoạt giải cao qua các năm. Hướng dẫn chi tiết cách cắm hoa đẹp nhất.',
    content: 'Full content here...',
    category: 'Món ngon & Công thức',
    author: 'Booking Res Team',
    publishDate: '2025-11-11',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
    views: 9876,
    city: 'Hà Nội',
    tags: ['Mẹo vặt gia đình', 'Công thức hot'],
  },
  {
    id: '9',
    title: 'Công thức các món ăn giải ngấy hiệu quả nhất',
    excerpt:
      'Tổng hợp các công thức món ăn giúp giải ngấy, thanh lọc cơ thể sau những bữa tiệc thịnh soạn. Các món ăn đơn giản, dễ làm.',
    content: 'Full content here...',
    category: 'Món ngon & Công thức',
    author: 'Booking Res Team',
    publishDate: '2025-07-25',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    views: 7654,
    city: 'Hà Nội',
    tags: ['Công thức các món ăn giải ngấy', 'Thực đơn hàng ngày'],
  },
  {
    id: '10',
    title: 'Top 10 nhà hàng Thái ngon nổi tiếng, hút khách nhất ở Hà Nội',
    excerpt:
      'Danh sách các nhà hàng Thái ngon nhất tại Hà Nội với hương vị chính thống, không gian đẹp và dịch vụ tốt.',
    content: 'Full content here...',
    category: 'Địa Điểm Ăn Uống',
    author: 'Booking Res Team',
    publishDate: '2025-08-05',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    views: 13456,
    city: 'Hà Nội',
    tags: ['Địa điểm ăn uống', 'Món ngon mỗi ngày'],
  },
];

