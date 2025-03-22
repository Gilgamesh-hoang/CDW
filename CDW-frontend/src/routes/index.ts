import Login from '@/pages/Login/Login';
import DefaultLayout from '../layouts/DefaultLayout';
import UserInfo from '../pages/UserInfo/UserInfo';
import Register from '@/pages/Register/Register';
import { ROUTES } from '@/utils/constant';
import ForgotPass from '@/pages/ForgotPass/ForgotPass';

export interface RouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  fullScreen?: boolean;
  children?: RouteType[];
}

export const publicRoutes: RouteType[] = [
  {
    path: ROUTES.REGISTER,
    element: Register,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.LOGIN,
    element: Login,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: ForgotPass,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const privateRoutes: RouteType[] = [
  {
    path: ROUTES.PROFILE,
    element: UserInfo,
    layout: DefaultLayout,
    fullScreen: true,
  },
];
