export const SERVER_URL = 'http://localhost:8182';
export const URL_CLIENT = 'http://localhost:5173';
export const ACCESS_TOKEN_LOCALSTORAGE = 'access_token';

export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  PROFILE: '/trang-ca-nhan',
  SHOP: '/cua-hang',
  PRODUCT: "/san-pham",
  ABOUT_US: '/ve-chung-toi',
  SERVICE: '/dich-vu',
  INCOME: '/tang-thu-nhap',
  FORGOT_PASSWORD: '/quen-mat-khau',
  NOT_FOUND: '/404',
  CONTACT: '/lien-he',
  CART: '/gio-hang',
  ADMIN_CATEGORY: '/admin/danh-muc',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_SIZE: '/admin/kich-co',
  ADMIN_ORDER: '/admin/don-hang',
  ADMIN_ORDER_DETAIL: '/admin/don-hang/:id',
});
