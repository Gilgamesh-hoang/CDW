import './App.css';
import { adminRoutes, privateRoutes, publicRoutes, RouteType } from './routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RoutePage from './components/route/RoutePage.tsx';
import Error404 from './pages/customer/Error/404/Error404';
import ScrollToTop from './components/ScrollToTop';
import LoadProfile from './components/LoadProfile.tsx';

function App() {
  return (
    <div>
      <Router>
        <LoadProfile />
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index)
          )}

          {privateRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index)
          )}

          {adminRoutes.map((route: RouteType, index: number) =>
            RoutePage(route, index)
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
