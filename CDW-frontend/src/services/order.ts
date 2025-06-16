import { ApiResponse, Order, PageResponse } from '../models';

import { httpGet, httpPut, httpPost } from '../axios.ts';

export const getOrders = async (page = 1, size = 10) => {
  return await httpGet<ApiResponse<PageResponse<Order[]>>>('admin/orders', {
    params: { page, size },
  }).then((response) => response.data);
};

export const getOrder = async (orderId: number) => {
  return await httpGet<ApiResponse<Order>>('admin/orders/' + orderId).then(
    (response) => response.data
  );
};

export const updateOrderStatus = async (id: number, status: string) => {
  return await httpPut<ApiResponse<void>>('admin/orders', { id, status });
};

export const getOrderBySlug = async (slug: string) => {
  return await httpGet<ApiResponse<Order>>(`orders/slug/${slug}`).then(
    (response) => response.data
  );
};

export const cancelOrder = async (orderId: number) => {
  return await httpPut<ApiResponse<Order>>(`orders/${orderId}/cancel`).then(
    (response) => response.data
  );
};
