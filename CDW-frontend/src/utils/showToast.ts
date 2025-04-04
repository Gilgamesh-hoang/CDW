import { Bounce, toast } from 'react-toastify';

export const toastSuccess = (message: string, timeout = 1000) => {
  toast.success(message, {
    autoClose: timeout,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'light',
    transition: Bounce,
  });
};

export const toastError = (message: string, timeout = 1000) => {
  toast.error(message, {
    autoClose: timeout,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'light',
    transition: Bounce,
  });
};