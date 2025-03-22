import AbstractResponse from '@/models/responses/AbstractResponseModel';
import { axiosNoToken } from '../../axios';
import { User } from '@/models';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
const routePath = '/auth';
export interface LoginParams {
  username: string;
  password: string;
}
export interface RegisterParams {
  fullname: string;
  password: string;
  retypePassword : string;
  username: string;
  email: string;
  phoneNumber: string;
}
export type AuthPayload = AbstractResponse<User> & { accessToken: string }
const AuthService = {
  async login({ username, password }: LoginParams) {
    return new Promise<AuthPayload>((resolve, reject) => {
      (async () => {
        try {
          const resp = await axiosNoToken.post(routePath + '/login', {
            username,
            password,
          });
          if (resp.data && resp.data.accessToken) {
            localStorage.setItem('accessToken', resp.data.accessToken);
          }
          resolve(resp.data);
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          reject(axiosError.response?.data || error);
        }
      })();
    });
  },

  async register({
    fullname,
    password,
    username,
    phoneNumber,
    email,
    retypePassword
  }: RegisterParams) {
    return new Promise<AuthPayload>((resolve, reject) => {
      (async ()=>{
        try {
          const resp = await axiosNoToken.post(routePath + '/register', {
            fullname,
            email,
            phoneNumber,
            password,
            username,
            retypePassword
          });
          resolve(resp.data);
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          reject(axiosError.response?.data || error);
        }
      })();
    });
  },
};

export default AuthService;
