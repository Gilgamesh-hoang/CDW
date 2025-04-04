import { httpDelete, httpGet, httpPost } from '../axios.ts';
import { ApiResponse, PageResponse, Size } from '../models';

export const getSizes = async (page = 1, size = 15) => {
  return await httpGet<ApiResponse<Size[]>>('sizes', { params: { page, size } })
    .then(response => response.data);
};

export const getSizesWithPages = async (page = 1, size = 15) => {
  return await httpGet<ApiResponse<PageResponse<Size[]>>>('sizes/page', { params: { page, size } })
    .then(response => response.data);
};

export const existsSize = async (name: string) => {
  return await httpGet<ApiResponse<boolean>>(`admin/sizes/exists`, { params: { name } })
    .then(response => response.data);
};


export const getSizeById = async (id: number) => {
  return await httpGet<ApiResponse<Size>>(`sizes/${id}`)
    .then(response => response.data);
};

export const createSize = async (name: string) => {
  return await httpPost<ApiResponse<Size>>('admin/sizes', { name })
    .then(response => response.data);
};

export const updateSize = async (id: number, name: string) => {
  return await httpPost<ApiResponse<Size>>('admin/sizes', { id, name })
    .then(response => response.data);
};

export const deleteSize = async (id: number) => {
  return await httpDelete<ApiResponse<void>>(`admin/sizes/${id}`);
};