import { ApiResponse } from '@/type';
import { Order, PageResponse } from '../type';
import { axiosToken } from '../axios.ts';

export const getOrders = async (page = 1, size = 10) => {
  return await axiosToken<ApiResponse<PageResponse<Order[]>>>('admin/orders', { params: { page, size } })
    .then(response => response.data.data);
};

export const getOrder = async (orderId: number) => {
  return await axiosToken<ApiResponse<Order>>('admin/orders/' + orderId)
    .then(response => response.data.data);
};

export const updateOrderStatus = async (id: number, status: string) => {
  return await axiosToken.put<ApiResponse<void>>('admin/orders', {id, status });
};

