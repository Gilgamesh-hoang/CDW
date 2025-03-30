import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { PageResponse, Size } from '../type';
import { axiosToken } from '../axios.ts';

export const getSizes = async (page = 1, size = 15) => {
  return await axiosNoToken<ApiResponse<Size[]>>('sizes', { params: { page, size } })
    .then(response => response.data.data);
};

export const getSizesWithPages = async (page = 1, size = 15) => {
  return await axiosNoToken<ApiResponse<PageResponse<Size[]>>>('sizes/page', { params: { page, size } })
    .then(response => response.data.data);
};

export const existsSize = async (name: string) => {
  return await axiosToken<ApiResponse<boolean>>(`admin/sizes/exists`, { params: { name } })
    .then(response => response.data.data);
};


export const getSizeById = async (id: number) => {
  return await axiosNoToken<ApiResponse<Size>>(`sizes/${id}`)
    .then(response => response.data.data);
};

export const createSize = async (name: string) => {
  return await axiosToken.post<ApiResponse<Size>>('admin/sizes', { name })
    .then(response => response.data.data);
};

export const updateSize = async (id: number, name: string) => {
  return await axiosToken.post<ApiResponse<Size>>('admin/sizes', { id, name })
    .then(response => response.data.data);
};

export const deleteSize = async (id: number) => {
  return await axiosToken.delete<ApiResponse<void>>(`admin/sizes/${id}`);
};