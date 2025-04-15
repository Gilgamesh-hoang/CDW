import { fetchCurrentUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hook';
import { authStateSelector } from '@/redux/selector';
import { ACCESS_TOKEN_LOCALSTORAGE } from '@/utils/constant';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoadProfile = () => {
  const dispatch = useAppDispatch();
  const { me } = useSelector(authStateSelector);
  useEffect(() => {
    if (!me && localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE)) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, me]);
  return <></>;
};
export default LoadProfile;
