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
import SizeTable from '../pages/admin/size/SizeTable.tsx';
import OrderTable from '../pages/admin/order/OrderTable.tsx';
import OrderDetail from '../pages/admin/order/OrderDetail.tsx';
import ProductDetail from '@/pages/customer/ProductDetail/ProductDetail.tsx';

export interface RouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  fullScreen?: boolean;
  children?: RouteType[];
}

export const publicRoutes: RouteType[] = [
  {
    path: ROUTES.HOME.url,
    element: Home,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.SHOP.url,
    element: Shop,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ABOUT_US.url,
    element: AboutUs,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.SERVICE.url,
    element: Service,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.CONTACT.url,
    element: Contact,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.REGISTER.url,
    element: Register,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.LOGIN.url,
    element: Login,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.FORGOT_PASSWORD.url,
    element: ForgotPass,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.PRODUCT_DETAIL.url,
    element: ProductDetail,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const privateRoutes: RouteType[] = [
  {
    path: ROUTES.CART.url,
    element: Cart,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.CHECKOUT.url,
    element: Checkout,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const adminRoutes: RouteType[] = [
  {
    path: ROUTES.ADMIN_DASHBOARD.url,
    element: Dashboard,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_CATEGORY.url,
    element: CategoryTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_SIZE.url,
    element: SizeTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_ORDER.url,
    element: OrderTable,
    layout: AdminLayout,
    fullScreen: true,
  },
  {
    path: ROUTES.ADMIN_ORDER_DETAIL.url,
    element: OrderDetail,
    layout: AdminLayout,
    fullScreen: true,
  },
];
