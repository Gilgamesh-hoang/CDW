import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { PageResponse, Product } from '../type';

export type SearchParams = {
  keyword?: string;
  categoryIds?: number[];
  sizeIds?: number[];
  page?: number;
  size?: number;
  sort?: string;
  direction?: string;
  priceRange?: string | null;
};

export const search = async (params: SearchParams) => {
  return await axiosNoToken.post<ApiResponse<PageResponse<Product[]>>>('search', params)
    .then(response => response.data.data);

}