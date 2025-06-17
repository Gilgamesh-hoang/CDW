import axios from 'axios';
import { API_URL } from '../constants';

export interface DiscountType {
  id?: number;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscountAmount?: number;
  startDate: Date | string;
  endDate: Date | string;
  usageLimit?: number;
  usageCount?: number;
  productIds?: number[];
  categoryIds?: number[];
  isActive?: boolean;
  createAt?: Date | string;
  updateAt?: Date | string;
}

export interface CreateDiscountRequest {
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscountAmount?: number;
  startDate: Date | string;
  endDate: Date | string;
  usageLimit?: number;
  productIds?: number[];
  categoryIds?: number[];
}

export interface UpdateDiscountRequest {
  id: number;
  description?: string;
  discountType?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  discountValue?: number;
  minimumOrderValue?: number;
  maximumDiscountAmount?: number;
  startDate?: Date | string;
  endDate?: Date | string;
  usageLimit?: number;
  productIds?: number[];
  categoryIds?: number[];
  isActive?: boolean;
}

export interface PageResponse<T> {
  data: T;
  currentPage: number;
  totalPage: number;
}

const adminDiscountService = {
  getAllDiscounts: async (
    page: number = 0,
    size: number = 10,
    sort: string = 'id'
  ) => {
    const response = await axios.get<PageResponse<DiscountType[]>>(
      `${API_URL}/api/admin/discounts`,
      {
        params: { page, size, sort },
        withCredentials: true,
      }
    );
    return response.data;
  },

  getActiveDiscounts: async () => {
    const response = await axios.get<DiscountType[]>(
      `${API_URL}/api/admin/discounts/active`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  getDiscountById: async (id: number) => {
    const response = await axios.get<DiscountType>(
      `${API_URL}/api/admin/discounts/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  getDiscountByCode: async (code: string) => {
    const response = await axios.get<DiscountType>(
      `${API_URL}/api/admin/discounts/code/${code}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  createDiscount: async (discount: CreateDiscountRequest) => {
    const response = await axios.post<DiscountType>(
      `${API_URL}/api/admin/discounts`,
      discount,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  updateDiscount: async (discount: UpdateDiscountRequest) => {
    const response = await axios.put<DiscountType>(
      `${API_URL}/api/admin/discounts`,
      discount,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  deleteDiscount: async (id: number) => {
    const response = await axios.delete(
      `${API_URL}/api/admin/discounts/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};

export default adminDiscountService;
