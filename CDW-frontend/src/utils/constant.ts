export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:8182';
export const URL_CLIENT =
  import.meta.env.VITE_URL_CLIENT || 'http://localhost:5173';
export const ACCESS_TOKEN_LOCALSTORAGE =
  import.meta.env.VITE_ACCESS_TOKEN_LOCALSTORAGE || 'access_token';

export const ROUTES = Object.freeze({
  HOME: {
    url: '/',
    name: 'Trang chủ',
  },
  LOGIN: {
    url: '/dang-nhap',
    name: 'Đăng nhập',
  },
  REGISTER: {
    url: '/dang-ky',
    name: 'Đăng ký',
  },
  PROFILE: {
    url: '/trang-ca-nhan',
    name: 'Trang cá nhân',
  },
  SHOP: {
    url: '/cua-hang',
    name: 'Cửa hàng',
  },
  PRODUCT: {
    url: '/san-pham',
    name: 'Sản phẩm',
  },
  PRODUCT_DETAIL: {
    url: '/san-pham/:id',
    name: 'Chi tiết sản phẩm',
  },
  ABOUT_US: {
    url: '/ve-chung-toi',
    name: 'Về chúng tôi',
  },
  SERVICE: {
    url: '/dich-vu',
    name: 'Dịch vụ',
  },
  INCOME: {
    url: '/tang-thu-nhap',
    name: 'Tăng thu nhập',
  },
  FORGOT_PASSWORD: {
    url: '/quen-mat-khau',
    name: 'Quên mật khẩu',
  },
  NOT_FOUND: {
    url: '/404',
    name: 'Không tìm thấy',
  },
  CONTACT: {
    url: '/lien-he',
    name: 'Liên hệ',
  },
  CART: {
    url: '/gio-hang',
    name: 'Giỏ hàng',
  },
  CHECKOUT: {
    url: '/thanh-toan',
    name: 'Thanh toán',
  },
  ORDER_SUCCESS: {
    url: '/thanh-toan/thanh-cong/:slug',
    name: 'Đặt hàng thành công',
  },
  ADMIN_CATEGORY: {
    url: '/admin/danh-muc',
    name: 'Danh mục',
  },
  ADMIN_DASHBOARD: {
    url: '/admin/dashboard',
    name: 'Dashboard',
  },
  ADMIN_SIZE: {
    url: '/admin/kich-co',
    name: 'Kích cỡ',
  },
  ADMIN_ORDER: {
    url: '/admin/don-hang',
    name: 'Đơn hàng',
  },
  ADMIN_ORDER_DETAIL: {
    url: '/admin/don-hang/:id',
    name: 'Chi tiết đơn hàng',
  },
  ADMIN_DISCOUNT: {
    url: '/admin/khuyen-mai',
    name: 'Khuyến mãi',
  },
});
