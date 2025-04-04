import './App.css';
import { adminRoutes, privateRoutes, publicRoutes, RouteType } from './routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RoutePage from './components/RoutePage';
import Error404 from './pages/customer/Error/404/Error404';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { fetchCurrentUser } from './features/auth/authSlice.ts';
import { useAppDispatch } from './redux/hook.ts';
import { ACCESS_TOKEN_LOCALSTORAGE } from './utils/constant.ts';

function App() {
  const dispatch = useAppDispatch();

  // Dispatch fetchCurrentUser khi component mount (tức là trang reload)
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE) !== null) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);


  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index),
          )}

          {privateRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index),
          )}

          {adminRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index),
          )}
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}

export default App;
