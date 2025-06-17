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
import { ACCESS_TOKEN_LOCALSTORAGE, ROUTES } from '../../utils/constant.ts';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hook.ts';
import { fetchCurrentUser } from '../../features/auth/authSlice.ts';

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
  const { me, isLoading } = useSelector(authStateSelector);
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);

    if (token && !me && !isLoading) {
      dispatch(fetchCurrentUser()).finally(() => {
        setIsChecking(false); // Hoàn tất kiểm tra
      });
    } else {
      setIsChecking(false); // Không cần fetch, chuyển sang kiểm tra quyền
    }
  }, [dispatch, me, isLoading, route.path]);


  if (isChecking ||isLoading) {
    return;

  }

  if (!hasAccess(route, me)) {
    // Nếu không có quyền, chuyển hướng dựa trên trạng thái đăng nhập
    // if (!me) {
    //   toastError('Bạn cần đăng nhập để truy cập trang này!', 1500);
    // } else {
    //   toastError('Bạn không có quyền truy cập trang này!', 1500);
    //
    // }
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
