export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar?: string;
  createdAt: string;
};

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    email: 'admin@bookingres.vn',
    password: 'admin123',
    name: 'Admin User',
    phone: '0987654321',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: '2024-01-10',
  },
];

// Helper function to find user by email
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

// Helper function to validate login
export const validateLogin = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Helper function to check if email exists
export const emailExists = (email: string): boolean => {
  return mockUsers.some((user) => user.email === email);
};

// Helper function to create new user
export const createUser = (
  email: string,
  password: string,
  name: string,
  phone: string
): User => {
  const newUser: User = {
    id: String(mockUsers.length + 1),
    email,
    password,
    name,
    phone,
    createdAt: new Date().toISOString().split('T')[0],
  };
  mockUsers.push(newUser);
  return newUser;
};

