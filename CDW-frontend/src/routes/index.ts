import Login from '@/pages/Login/Login';
import DefaultLayout from '../layouts/DefaultLayout';
import UserInfo from '../pages/UserInfo/UserInfo';
import Register from '@/pages/Register/Register';
import { ROUTES } from '@/utils/constant';
import ForgotPass from '@/pages/ForgotPass/ForgotPass';
import Home from '@/pages/Home/Home';
import AboutUs from '@/pages/AboutUs/AboutUs';
import Service from '@/pages/Service/Service';
import Contact from '@/pages/Contact/Contact';
import Shop from '@/pages/Shop/Shop';

export interface RouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  fullScreen?: boolean;
  children?: RouteType[];
}

export const publicRoutes: RouteType[] = [
  {
    path: ROUTES.HOME,
    element: Home,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.SHOP,
    element: Shop,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ABOUT_US,
    element: AboutUs,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.SERVICE,
    element: Service,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.CONTACT,
    element: Contact,
    layout: DefaultLayout,
    fullScreen: true,
  },
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
