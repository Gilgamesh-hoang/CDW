import { ApiResponse, Order, PageResponse } from '../models';

import { httpGet, httpPut } from '../axios.ts';

export const getOrders = async (page = 1, size = 10) => {
  return await httpGet<ApiResponse<PageResponse<Order[]>>>('admin/orders', { params: { page, size } })
    .then(response => response.data);
};

export const getOrder = async (orderId: number) => {
  return await httpGet<ApiResponse<Order>>('admin/orders/' + orderId)
    .then(response => response.data);
};

export const updateOrderStatus = async (id: number, status: string) => {
  return await httpPut<ApiResponse<void>>('admin/orders', {id, status });
};

