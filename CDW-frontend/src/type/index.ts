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
}

export interface Size {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  code: string;
  productCount: number;
}