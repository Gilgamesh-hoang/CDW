import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { Product } from '../type';

export const getNewestProducts = async (page = 1, size = 5) => {
  return await axiosNoToken<ApiResponse<Product[]>>('products/newest', { params: { page, size } })
    .then(response => response.data.data);
};

export const getBestSellerProducts = async (page = 1, size = 5) => {
  return await axiosNoToken<ApiResponse<Product[]>>('products/best-seller', { params: { page, size } })
    .then(response => response.data.data);
};