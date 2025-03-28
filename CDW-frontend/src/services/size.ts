import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { Size } from '../type';

export const getSizes = async (page = 1, size = 5) => {
  return await axiosNoToken<ApiResponse<Size[]>>('sizes', { params: { page, size } })
    .then(response => response.data.data);
};