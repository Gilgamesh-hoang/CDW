import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE, ROUTES, SERVER_URL, URL_CLIENT } from './utils/constant';
import { ApiResponse, JwtResponse } from './models';

export const baseURL: string = SERVER_URL + '/api/v1/';

const httpRequest: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor to refresh the token if it is expired
httpRequest.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  },
);

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle unauthorized errors (e.g., 401 or custom "You're not auth")
httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/login' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        if (isRefreshing) {
          // Nếu đang refresh, thêm request vào queue và chờ
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              return httpRequest(originalConfig);
            })
            .catch((err) => Promise.reject(err));
        }

        // Bắt đầu refresh token
        isRefreshing = true;
        try {
          const response = await httpPost<ApiResponse<JwtResponse>>(
            '/auth/refresh-token', {}, { withCredentials: true },
          );

          const accessToken = response?.data?.token;
          if (!accessToken) {
            throw new Error('No access token received from refresh endpoint');
          }

          // Lưu token mới
          localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, accessToken);
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;

          // Xử lý các request trong queue
          processQueue(null, accessToken);

          // Thử lại request gốc
          return httpRequest(originalConfig);
        } catch (refreshError) {
          // Xử lý lỗi refresh token
          processQueue(refreshError);
          localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);
          window.location.href = `${URL_CLIENT}${ROUTES.LOGIN}`;
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(err);
  },
);

export const httpGet = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.get<T>(path, option);
  return response.data;
};

export const httpPost = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.post<T>(path, data, option);
  return response.data;
};
export const httpPut = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.put<T>(path, data, option);
  return response.data;
};
export const httpDelete = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.delete<T>(path, option);
  return response.data;
};