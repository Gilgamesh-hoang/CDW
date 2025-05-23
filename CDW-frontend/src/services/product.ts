import { httpGet } from '../axios.ts';
import { ApiResponse, Product, ProductDetails } from '../models';

export const getNewestProducts = async (page = 1, size = 5) => {
  return await httpGet<ApiResponse<Product[]>>('products/newest', {
    params: { page, size },
  }).then((response) => response.data);
};

export const getBestSellerProducts = async (page = 1, size = 5) => {
  return await httpGet<ApiResponse<Product[]>>('products/best-seller', {
    params: { page, size },
  }).then((response) => response.data);
};

export const getProductDetails = async (id: number) => {
  return await httpGet<ApiResponse<ProductDetails>>(`products/${id}`).then(
    (response) => response.data
  );
};
