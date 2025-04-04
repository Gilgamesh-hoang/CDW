import { httpGet } from '../axios.ts';
import { ApiResponse, User } from '../models';

export const getCurrentUser = async () => {
  return await httpGet<ApiResponse<User>>('users/me')
};
