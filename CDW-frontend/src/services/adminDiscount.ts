import axios from 'axios';
import { API_URL } from '@/config';
import { httpDelete, httpGet, httpPost, httpPut } from '@/axios';

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
    const response = await httpGet<PageResponse<DiscountType[]>>(
      `${API_URL}/admin/discounts`,
      {
        params: { page, size, sort },
        withCredentials: true,
      }
    );
    return response;
  },

  getActiveDiscounts: async () => {
    const response = await httpGet<DiscountType[]>(
      `${API_URL}/admin/discounts/active`,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  getDiscountById: async (id: number) => {
    const response = await httpGet<DiscountType>(
      `${API_URL}/admin/discounts/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  getDiscountByCode: async (code: string) => {
    const response = await httpGet<DiscountType>(
      `${API_URL}/admin/discounts/code/${code}`,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  createDiscount: async (discount: CreateDiscountRequest) => {
    const response = await httpPost<DiscountType>(
      `${API_URL}/admin/discounts`,
      discount,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  updateDiscount: async (discount: UpdateDiscountRequest) => {
    const response = await httpPut<DiscountType>(
      `${API_URL}/admin/discounts`,
      discount,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  deleteDiscount: async (id: number) => {
    const response = await httpDelete(`${API_URL}/admin/discounts/${id}`, {
      withCredentials: true,
    });
    return response;
  },
};

export default adminDiscountService;
