import { ApiResponse } from '../models';
import { Category } from '../models';
import { httpGet, httpPost, httpDelete, httpPut } from '../axios.ts';

export const existsCategory = async (code:string) => {
  return await httpGet<ApiResponse<boolean>>(`admin/categories/exists/${code}`)
    .then(response => response.data);
};

export const getCategories = async (page = 1, size = 5) => {
  return await httpGet<ApiResponse<Category[]>>('categories', { params: { page, size } })
    .then(response => response.data)
};

export const getCategoryById = async (id: number) => {
  return await httpGet<ApiResponse<Category>>(`categories/${id}`)
    .then(response => response.data);
};

export const createCategory = async (name: string, code: string) => {
  return await httpPost<ApiResponse<Category>>('admin/categories', { name, code })
    .then(response => response.data);
};

export const updateCategory = async (id: number, name: string, code: string) => {
  return await httpPut<ApiResponse<Category>>('admin/categories', { id, name, code })
    .then(response => response.data);
};

export const deleteCategory = async (id: number) => {
  return await httpDelete<ApiResponse<void>>(`admin/categories/${id}`);
};