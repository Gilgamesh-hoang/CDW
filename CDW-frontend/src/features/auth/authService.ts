import { ApiResponse, AuthResponse, User } from '../../models';
import { ACCESS_TOKEN_LOCALSTORAGE } from '../../utils/constant.ts';
import { httpPost } from '../../axios.ts';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

const routePath = 'auth';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  fullName: string;
  password: string;
  retypePassword: string;
  userName: string;
  email: string;
}

const AuthService = {
  async login({ email, password }: LoginParams) {
    return new Promise<ApiResponse<User>>((resolve, reject) => {
      (async () => {
        try {
          const resp: ApiResponse<AuthResponse> = await httpPost(
            routePath + '/login',
            {
              email,
              password,
            }
          );

          const data: AuthResponse = resp.data;

          if (data && data.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, data.accessToken);
          }

          const result: ApiResponse<User> = {
            message: resp.message,
            data: {
              ...data.user,
            },
            status: resp.status,
          };

          resolve(result);
        } catch (error) {
          const axiosError = error as ApiResponse<void>;
          reject(axiosError.message || error);
        }
      })();
    });
  },

  async logout() {
    return new Promise<ApiResponse<void>>((resolve, reject) => {
      (async () => {
        try {
          const res: ApiResponse<void> = await httpPost(routePath + '/logout');

          // Xóa token khỏi localStorage
          localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);

          resolve(res);
        } catch (error) {
          const axiosError = error as ApiResponse<void>;
          reject(axiosError.message || error);
        }
      })();
    });
  },

  async register({
    fullName,
    password,
    userName,
    email,
    retypePassword,
  }: RegisterParams) {
    return new Promise<ApiResponse<User>>((resolve, reject) => {
      (async () => {
        try {
          const resp = await httpPost<ApiResponse<User>>(
            routePath + '/register',
            {
              fullName,
              email,
              password,
              userName,
              retypePassword,
            }
          );
          resolve(resp);
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          reject(axiosError.response?.data || error);
        }
      })();
    });
  },
};

export default AuthService;
