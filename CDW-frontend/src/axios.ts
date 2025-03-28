import axios from 'axios';
import { SERVER_URL, URL_CLIENT } from './utils/constant';
export const baseURL: string = SERVER_URL + '/api/v1/';
export const clientURL: string = URL_CLIENT;
import { jwtDecode } from 'jwt-decode';

export const axiosNoToken = axios.create({
  baseURL,
  withCredentials: true,
});
export const axiosToken = axios.create({
  baseURL,
  headers: {
    // Authorization: localStorage.getItem('accessToken'),
    Authorization: 'Bearer ' + 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyb2xlIjoiQURNSU4iLCJqaWQiOiJmNjU2ZWQ2Ny1jNTEwLTQ0NmMtYTU1Mi0xOTAyMGZiZmNjNmYiLCJzdWIiOiJ2b3BoaWhvYW5nQGdtYWlsLmNvbSIsImlhdCI6MTc0MzA3OTM3MSwiZXhwIjoxNzQzNjg0MTcxfQ.PUxD9YzsAjloUXk8VVkb2fVIOeuaP7Vddgk1z3uxLmS5V24TyeFwl32jNucMu81s6HOHV2LtLvjlG6y5pXVTFJzE83003qGaOoc4trGmlmz5zvcYdFtRw7pTb5XdXnWI8Bc9PKxp8H_UFYEQGALfp_tV5iQ76XkmXuzXrjwEeqGF_yRBgqSRholIU9RzVytIIYDNR_TfOqgJEid6sJJG84G_vPb2gtUipWAc3B4VJuBWVFDHbfnGX-__BIAAlc3ufgPbGxwb6k1etUvSJ1fisVxZQr8cza3HqvF7F9U10a70GQYv_TwFqHbk1w7dZXI4QPth3IYYiKqRt_gR5lilVQ',
  },
  withCredentials: true,
});

// Request interceptor to refresh the token if it is expired
axiosToken.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const date = new Date();
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp! < date.getTime() / 1000) {
      try {
        const resp: { accessToken: string } = await axiosNoToken.post(
          '/auth/token/refresh'
        );
        localStorage.setItem('accessToken', resp.accessToken);
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('accessToken');
      }
    }
    config.headers['Authorization'] = accessToken;
  }
  return config;
});

// Response interceptor to handle unauthorized errors (e.g., 401 or custom "You're not auth")
axiosToken.interceptors.response.use(
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
