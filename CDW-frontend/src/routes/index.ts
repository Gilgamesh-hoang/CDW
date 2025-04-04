import Login from '@/pages/Login/Login';
import DefaultLayout from '../layouts/DefaultLayout';
import Register from '@/pages/Register/Register';
import { ROUTES } from '@/utils/constant';
import Cart from '../pages/customer/Cart/Cart.tsx';
import CategoryTable from '../pages/admin/category/CategoryTable.tsx';
import AdminLayout from '../layouts/AdminLayout.tsx';
import { Dashboard } from '../pages/admin/dashboard';
import Home from '../pages/customer/Home/Home.tsx';
import Shop from '../pages/customer/Shop/Shop.tsx';
import AboutUs from '../pages/customer/AboutUs/AboutUs.tsx';
import Service from '../pages/customer/Service/Service.tsx';
import Contact from '../pages/customer/Contact/Contact.tsx';
import ForgotPass from '../pages/customer/ForgotPass/ForgotPass.tsx';
import ProductDetail from '../pages/customer/Product/ProductDetail.tsx';
import SizeTable from '../pages/admin/size/SizeTable.tsx';
import OrderTable from '../pages/admin/order/OrderTable.tsx';
import OrderDetail from '../pages/admin/order/OrderDetail.tsx';

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
  {
    path: ROUTES.PRODUCT,
    element: ProductDetail,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const privateRoutes: RouteType[] = [
  {
    path: ROUTES.CART,
    element: Cart,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const adminRoutes: RouteType[] = [
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: Dashboard,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_CATEGORY,
    element: CategoryTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_SIZE,
    element: SizeTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_ORDER,
    element: OrderTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_ORDER_DETAIL,
    element: OrderDetail,
    layout: AdminLayout,
    fullScreen: true,
  },
];