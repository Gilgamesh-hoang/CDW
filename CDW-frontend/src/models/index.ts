import { UserRole } from './enums.ts';

export interface ApiResponse<T = null> {
  status: number;
  message: string;
  data: T;
}

export interface PageResponse<T = null> {
  totalPage: number;
  currentPage: number;
  data: T;
}

export interface ProductSize {
  id: number;
  sizeId: number;
  sizeName: string;
  productId: number;
  productName: string;
  productThumbnail: string;
  price: number;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  subTotal: number;
  productSize: ProductSize;
}

export interface Product {
  id: number;
  name: string;
  content: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  slug?: string;
  categoryId?: number;
  categoryName?: string;
  totalViewAndSearch?: number;
  sizeId?: number;
  sizeName?: string;
  quantity?: number;
  available?: number;
  subTotal?: number;
  productSizeId?: number;
  createAt?: Date;
  sales?: number;
}

export interface DashboardResponse {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCategories: number;
  salesData: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  topProducts: Product[];
  recentOrders: Order[];
}

export interface Size {
  id: number;
  name: string;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  code: string;
  productCount?: number;
}

export interface Address {
  id: number;
  fullName: string;
  phoneNumber: string;
  province: string;
  district: string;
  commune: string;
  hamlet: string;
  createAt: Date;
}

export interface JwtResponse {
  token: string;
}

export interface Order {
  id: number;
  status: string;
  note: string;
  totalAmount: number;
  address: Address;
  isPaid: boolean;
  slug: string;
  createAt: Date;
  listProduct: Product[];
  orderDetails: OrderDetail[];
}

export interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  createAt: Date;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ProductDetails {
  id: number;
  name: string;
  content: string;
  shortDescription: string;
  thumbnail: string;
  price: number | null;
  modelUrl: string;
  slug: string | null;
  categoryId: number;
  categoryName: string;
  totalViewAndSearch: number;
  quantity: number | null;
  available: boolean | null;
  subTotal: number | null;
  createAt: string;
  images: string[];
  sizes: Size[];
}

export interface Review {
  id: number;
  userName: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpful?: number;
  title?: string;
  userId?: number;
  productId?: number;
  createAt?: string;
  updateAt?: string;
}
