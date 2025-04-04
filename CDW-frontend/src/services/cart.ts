import { ApiResponse, Product } from '../models';
import { httpGet, httpPost, httpDelete } from '../axios.ts';

export const getCart = async () => {
  return await httpGet<ApiResponse<Product[]>>('cart')
    .then(response => response.data);
};

export const addOrUpdateCartItem = async (productId: number, sizeId: number, quantity = 1) => {
  return await httpPost<ApiResponse<void>>('cart', { productId, quantity, sizeId });
};

export const deleteCartItem = async (productId: number, sizeId: number) => {
  return await httpDelete<ApiResponse<void>>('cart', { data: { productId, sizeId } });
};
