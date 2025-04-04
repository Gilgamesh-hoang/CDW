import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL, URL_CLIENT } from './utils/constant';
export const baseURL: string = SERVER_URL + '/api/v1/';
export const clientURL: string = URL_CLIENT;
import { jwtDecode } from 'jwt-decode';

const httpRequest: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor to refresh the token if it is expired
httpRequest.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE) ;
  const date = new Date();
  if (accessToken) {
    // const decodedToken = jwtDecode(accessToken);
    // if (decodedToken.exp! < date.getTime() / 1000) {
    //   try {
    //     const resp: { accessToken: string } = await axiosNoToken.post(
    //       '/auth/token/refresh'
    //     );
    //     localStorage.setItem('accessToken', resp.accessToken);
    //   } catch (error) {
    //     console.error('Token refresh failed:', error);
    //     localStorage.removeItem('accessToken');
    //   }
    // }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle unauthorized errors (e.g., 401 or custom "You're not auth")
httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('You are not authorized. Removing access token.');
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);

export const httpGet = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.get<T>(path, option);
  return response.data;
}

export const httpPost = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.post<T>(path, data, option);
  return response.data;
}
export const httpPut = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.put<T>(path, data, option);
  return response.data;
}
export const httpDelete = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await httpRequest.delete<T>(path, option);
  return response.data;
}