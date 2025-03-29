import { ApiResponse } from '@/type';
import { Product } from '../type';
import { axiosToken } from '../axios.ts';

export const getCart = async () => {
  return await axiosToken<ApiResponse<Product[]>>('cart')
    .then(response => response.data.data);
};

export const addOrUpdateCartItem = async (productId: number, sizeId: number, quantity = 1) => {
  return await axiosToken.post<ApiResponse<void>>('cart', { productId, quantity, sizeId });
};

export const deleteCartItem = async (productId: number, sizeId: number) => {
  return await axiosToken.delete<ApiResponse<void>>('cart', { data: { productId, sizeId } });
};
