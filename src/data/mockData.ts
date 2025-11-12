export type Restaurant = {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  cuisine: string[];
  priceRange: string;
  rating: number;
  reviewCount: number;
  image: string;
  hasPrivateRoom: boolean;
  capacity: number;
  suitableFor: string[];
  mealTypes: string[];
  isExclusive: boolean;
  lat?: number;
  lng?: number;
  // Detailed info
  description?: string;
  averagePrice?: string;
  openingHours?: {
    [key: string]: { open: string; close: string };
  };
  amenities?: {
    wifi: boolean;
    airConditioning: boolean;
    cardPayment: boolean;
    privateRoom: boolean;
    parking: boolean;
    smoking: boolean;
    karaoke: boolean;
    stage: boolean;
    eventDecoration: boolean;
    outsideFood: boolean;
    outsideDrinks: boolean;
  };
  gallery?: string[];
  menuImages?: string[];
  regulations?: string[];
};

export type Location = {
  id: string;
  name: string;
  districts: string[];
};

export const cities: Location[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    districts: [
      'Quận Hoàn Kiếm',
      'Quận Ba Đình',
      'Quận Nam Từ Liêm',
      'Quận Bắc Từ Liêm',
      'Quận Cầu Giấy',
      'Quận Hai Bà Trưng',
      'Quận Tây Hồ',
      'Quận Hoàng Mai',
      'Quận Thanh Xuân',
      'Quận Hà Đông',
      'Quận Long Biên',
      'Quận Đống Đa',
    ],
  },
  {
    id: 'hcm',
    name: 'Hồ Chí Minh',
    districts: [
      'Quận 1',
      'Quận 2',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 9',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Gò Vấp',
      'Bình Thạnh',
      'Tân Bình',
      'Tân Phú',
      'Phú Nhuận',
      'Bình Tân',
      'Thủ Đức',
    ],
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    districts: ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Lộc-Ally Restaurant - Cát Linh',
    address: 'Tầng 2, Khách Sạn Grand Mercure Hanoi, Số 9 Cát Linh, P. Cát Linh',
    district: 'Quận Đống Đa',
    city: 'Hà Nội',
    cuisine: ['Buffet Món Việt', 'Gọi món Á - Âu'],
    priceRange: '200K - 300K',
    rating: 4.0,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    hasPrivateRoom: true,
    capacity: 100,
    suitableFor: ['Tiệc/Hội nghị', 'Gia đình', 'Hẹn hò'],
    mealTypes: ['Bữa trưa', 'Bữa tối'],
    isExclusive: true,
    lat: 21.0075,
    lng: 105.8442,
    description:
      'Lộc-Ally Restaurant là một không gian ẩm thực hiện đại, kết hợp tinh hoa ẩm thực Á - Âu. Nhà hàng mang đến trải nghiệm ẩm thực đa dạng với buffet phong phú và menu gọi món đặc sắc. Không gian sang trọng, phù hợp cho các buổi họp mặt gia đình, tiệc công ty hay những buổi hẹn hò lãng mạn.',
    averagePrice: '200.000 - 300.000 VNĐ/người',
    openingHours: {
      'Thứ 2': { open: '11:00', close: '22:00' },
      'Thứ 3': { open: '11:00', close: '22:00' },
      'Thứ 4': { open: '11:00', close: '22:00' },
      'Thứ 5': { open: '11:00', close: '22:00' },
      'Thứ 6': { open: '11:00', close: '22:00' },
      'Thứ 7': { open: '11:00', close: '22:00' },
      'Chủ nhật': { open: '11:00', close: '22:00' },
    },
    amenities: {
      wifi: true,
      airConditioning: true,
      cardPayment: true,
      privateRoom: true,
      parking: true,
      smoking: false,
      karaoke: false,
      stage: false,
      eventDecoration: false,
      outsideFood: false,
      outsideDrinks: false,
    },
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    ],
    menuImages: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    ],
    regulations: [
      'Áp dụng cho nhóm từ 1 - 10 khách',
      'Đặt bàn trước ít nhất 2 giờ',
      'Hủy đặt bàn trước ít nhất 1 giờ',
      'Thanh toán tại nhà hàng',
    ],
  },
  {
    id: '2',
    name: 'Sushi Hokkaido Premium',
    address: '123 Nguyễn Huệ, Phường Bến Nghé',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    cuisine: ['Món Nhật', 'Sushi'],
    priceRange: '500K - 1000K',
    rating: 4.8,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    hasPrivateRoom: true,
    capacity: 30,
    suitableFor: ['Hẹn hò', 'Sang trọng', 'Gia đình'],
    mealTypes: ['Bữa trưa', 'Bữa tối'],
    isExclusive: false,
    lat: 10.7769,
    lng: 106.7009,
  },
  {
    id: '3',
    name: 'Lẩu Thái Chua Cay',
    address: '45 Lê Lợi, Phường Bến Thành',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    cuisine: ['Món Thái', 'Lẩu'],
    priceRange: '150K - 250K',
    rating: 4.3,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    hasPrivateRoom: false,
    capacity: 40,
    suitableFor: ['Gia đình', 'Nhóm bạn'],
    mealTypes: ['Bữa trưa', 'Bữa tối', 'Bữa ăn khuya'],
    isExclusive: false,
    lat: 10.7720,
    lng: 106.6983,
  },
  {
    id: '4',
    name: 'Steak House Premium',
    address: '89 Tràng Tiền, Phường Tràng Tiền',
    district: 'Quận Hoàn Kiếm',
    city: 'Hà Nội',
    cuisine: ['Món Âu', 'Steak'],
    priceRange: '500K - 1000K',
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    hasPrivateRoom: true,
    capacity: 60,
    suitableFor: ['Hẹn hò', 'Sang trọng', 'Tiệc/Hội nghị'],
    mealTypes: ['Bữa tối'],
    isExclusive: true,
    lat: 21.0285,
    lng: 105.8542,
  },
  {
    id: '5',
    name: 'Quán Nhậu Bình Dân',
    address: '234 Nguyễn Văn Cừ, Phường 4',
    district: 'Quận 5',
    city: 'Hồ Chí Minh',
    cuisine: ['Món Việt', 'Địa Điểm Nhậu'],
    priceRange: '< 150K',
    rating: 4.2,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    hasPrivateRoom: false,
    capacity: 80,
    suitableFor: ['Nhóm bạn', 'Bình dân'],
    mealTypes: ['Bữa tối', 'Bữa ăn khuya'],
    isExclusive: false,
    lat: 10.7540,
    lng: 106.6690,
  },
  {
    id: '6',
    name: 'Buffet Hải Sản Tươi Sống',
    address: '156 Bà Triệu, Phường Lê Đại Hành',
    district: 'Quận Hai Bà Trưng',
    city: 'Hà Nội',
    cuisine: ['Buffet', 'Hải Sản'],
    priceRange: '500K - 1000K',
    rating: 4.6,
    reviewCount: 423,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    hasPrivateRoom: true,
    capacity: 100,
    suitableFor: ['Gia đình', 'Tiệc/Hội nghị', 'Nhóm bạn'],
    mealTypes: ['Bữa trưa', 'Bữa tối'],
    isExclusive: false,
    lat: 21.0125,
    lng: 105.8500,
  },
  {
    id: '7',
    name: 'Pizza Italia',
    address: '78 Điện Biên Phủ, Phường Đa Kao',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    cuisine: ['Pizza', 'Món Ý'],
    priceRange: '150K - 250K',
    rating: 4.4,
    reviewCount: 278,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    hasPrivateRoom: false,
    capacity: 50,
    suitableFor: ['Gia đình', 'Nhóm bạn'],
    mealTypes: ['Bữa trưa', 'Bữa tối'],
    isExclusive: false,
    lat: 10.7900,
    lng: 106.6950,
  },
  {
    id: '8',
    name: 'Nhà hàng Chay Thanh Tịnh',
    address: '12 Phan Đình Phùng, Phường Quán Thánh',
    district: 'Quận Ba Đình',
    city: 'Hà Nội',
    cuisine: ['Món chay'],
    priceRange: '150K - 250K',
    rating: 4.5,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    hasPrivateRoom: true,
    capacity: 35,
    suitableFor: ['Gia đình', 'Truyền thống'],
    mealTypes: ['Bữa trưa', 'Bữa tối'],
    isExclusive: false,
    lat: 21.0375,
    lng: 105.8325,
  },
];

export const priceRanges = ['< 150K', '150K - 250K', '250K - 500K', '500K - 1000K', '> 1000K'];

export const cuisineTypes = [
  'Món miền Bắc',
  'Món miền Trung',
  'Món miền Nam',
  'Món Nhật-Hàn',
  'Món Âu',
  'Món Thái',
  'Món Trung Quốc',
  'Lẩu',
  'Buffet',
  'Nướng',
  'Hải Sản',
  'Món chay',
  'Pizza',
  'Món Ý',
  'Món Việt',
];

export const suitableFor = [
  'Tiệc/Hội nghị',
  'Hiện đại',
  'Truyền thống',
  'Sang trọng',
  'Cổ điển',
  'Thiên nhiên',
  'Sân vườn',
  'Ăn gia đình',
  'Hẹn hò',
  'Nhóm bạn',
];

export type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  restaurantIds: string[];
  city?: string;
};

export const collections: Collection[] = [
  {
    id: '1',
    title: 'Nhà hàng Buffet nổi tiếng',
    description: 'Khám phá các nhà hàng buffet chất lượng với giá cả hợp lý',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    restaurantIds: ['2', '6'],
    city: 'Hà Nội',
  },
  {
    id: '2',
    title: 'Nhà hàng Hải sản tươi sống',
    description: 'Thưởng thức hải sản tươi ngon nhất tại các nhà hàng uy tín',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    restaurantIds: ['6'],
    city: 'Hà Nội',
  },
  {
    id: '3',
    title: 'Nhà hàng Nhật Bản đẳng cấp',
    description: 'Trải nghiệm ẩm thực Nhật Bản chính thống',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
    restaurantIds: ['2'],
    city: 'Hồ Chí Minh',
  },
  {
    id: '4',
    title: 'Nhà hàng cho gia đình',
    description: 'Không gian ấm cúng, phù hợp cho bữa ăn gia đình',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    restaurantIds: ['1', '5', '8'],
    city: 'Hà Nội',
  },
  {
    id: '5',
    title: 'Nhà hàng Hẹn hò lãng mạn',
    description: 'Không gian sang trọng, lý tưởng cho các buổi hẹn hò',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    restaurantIds: ['2', '4'],
    city: 'Hồ Chí Minh',
  },
  {
    id: '6',
    title: 'Nhà hàng Món chay thanh tịnh',
    description: 'Thực đơn chay phong phú, tốt cho sức khỏe',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    restaurantIds: ['8'],
    city: 'Hà Nội',
  },
];

