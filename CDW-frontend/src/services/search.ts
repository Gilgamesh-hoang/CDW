import { httpPost } from '../axios.ts';
import { ApiResponse, PageResponse, Product } from '../models';

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
  return await httpPost<ApiResponse<PageResponse<Product[]>>>('search', params)
    .then(response => response.data);

};