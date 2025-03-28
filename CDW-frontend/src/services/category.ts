import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { Category } from '../type';

export const getCategories = async (page = 1, size = 5) => {
  return await axiosNoToken<ApiResponse<Category[]>>('categories', { params: { page, size } })
    .then(response => response.data.data);
};