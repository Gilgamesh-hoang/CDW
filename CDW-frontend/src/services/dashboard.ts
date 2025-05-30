import { httpGet } from '@/axios';
import { ApiResponse, DashboardResponse } from '@/models';

const API_URL = import.meta.env.VITE_API_URL;

export const getDashboard = async (startDate: string, endDate: string) => {
  const response = await httpGet<ApiResponse<DashboardResponse>>(
    `/admin/dashboard?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};
