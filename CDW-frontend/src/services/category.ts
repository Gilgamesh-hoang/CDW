import { axiosNoToken } from '@/axios.ts';
import { ApiResponse } from '@/type';
import { Category } from '../type';
import { axiosToken } from '../axios.ts';

export const existsCategory = async (code:string) => {
  return await axiosToken<ApiResponse<boolean>>(`admin/categories/exists/${code}`)
    .then(response => response.data.data);
};

export const getCategories = async (page = 1, size = 5) => {
  return await axiosNoToken<ApiResponse<Category[]>>('categories', { params: { page, size } })
    .then(response => response.data.data);
};

export const getCategoryById = async (id: number) => {
  return await axiosNoToken<ApiResponse<Category>>(`categories/${id}`)
    .then(response => response.data.data);
};

export const createCategory = async (name: string, code: string) => {
  return await axiosToken.post<ApiResponse<Category>>('admin/categories', { name, code })
    .then(response => response.data.data);
};

export const updateCategory = async (id: number, name: string, code: string) => {
  return await axiosToken.put<ApiResponse<Category>>('admin/categories', { id, name, code })
    .then(response => response.data.data);
};

export const deleteCategory = async (id: number) => {
  return await axiosToken.delete<ApiResponse<void>>(`admin/categories/${id}`);
};