import {
  adminRoutes,
  privateRoutes,
  publicRoutes,
  RouteType,
} from '../../routes';
import { useSelector } from 'react-redux';
import { authStateSelector } from '../../redux/selector.ts';
import { User } from '../../models';
import { toastError } from '../../utils/showToast.ts';
import { ROUTES } from '../../utils/constant.ts';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  route: RouteType;
  children: React.ReactNode;
}

const hasAccess = (route: RouteType, user: User | null): boolean => {
  const isPublicRoute = publicRoutes.some((r) => r.path === route.path);
  const isPrivateRoute = privateRoutes.some((r) => r.path === route.path);
  const isAdminRoute = adminRoutes.some((r) => r.path === route.path);

  if (!user) {
    // Người dùng chưa đăng nhập: Chỉ được truy cập publicRoutes
    return isPublicRoute;
  }

  if (user.role === 'ADMIN') {
    // Admin: Được truy cập tất cả
    return isPublicRoute || isPrivateRoute || isAdminRoute;
  }

  if (user.role === 'CUSTOMER') {
    // Customer đã đăng nhập: Được truy cập privateRoutes và publicRoutes
    return isPrivateRoute || isPublicRoute;
  }

  return false; // Trường hợp không xác định
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ route, children }) => {
  const { me } = useSelector(authStateSelector);
  const navigate = useNavigate();

  if (!hasAccess(route, me)) {
    // Nếu không có quyền, chuyển hướng dựa trên trạng thái đăng nhập
    if (!me) {
      toastError('Bạn cần đăng nhập để truy cập trang này!', 1500);
      navigate(ROUTES.HOME.url);
      return;
    } else {
      toastError('Bạn không có quyền truy cập trang này!', 1500);
      navigate(ROUTES.HOME.url);
      return;
    }
  }

  return <>{children}</>;
};
export default ProtectedRoute;
