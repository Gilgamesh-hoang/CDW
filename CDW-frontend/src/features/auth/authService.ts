import { ApiResponse, AuthResponse, User } from '../../models';
import { ACCESS_TOKEN_LOCALSTORAGE } from '../../utils/constant.ts';
import { httpPost } from '../../axios.ts';

const routePath = 'auth';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  fullname: string;
  password: string;
  retypePassword: string;
  username: string;
  email: string;
  phoneNumber: string;
}

const AuthService = {
  async login({ email, password }: LoginParams) {
    return new Promise<ApiResponse<User>>((resolve, reject) => {
      (async () => {
        try {
          const resp: ApiResponse<AuthResponse> = await httpPost(routePath + '/login', {
            email,
            password,
          });

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

          // Xóa token và thông tin người dùng khỏi localStorage
          localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);

          resolve(res);
        } catch (error) {
          const axiosError = error as ApiResponse<void>;
          reject(axiosError.message || error);
        }
      })();
    });
  },

  // async register({
  //   fullname,
  //   password,
  //   username,
  //   phoneNumber,
  //   email,
  //   retypePassword
  // }: RegisterParams) {
  //   return new Promise<AuthPayload>((resolve, reject) => {
  //     (async ()=>{
  //       try {
  //         const resp = await axiosNoToken.post(routePath + '/register', {
  //           fullname,
  //           email,
  //           phoneNumber,
  //           password,
  //           username,
  //           retypePassword
  //         });
  //         resolve(resp.data);
  //       } catch (error) {
  //         const axiosError = error as AxiosError<ErrorResponse>;
  //         reject(axiosError.response?.data || error);
  //       }
  //     })();
  //   });
  // },
};

export default AuthService;
