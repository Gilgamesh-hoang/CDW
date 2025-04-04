import { Route } from 'react-router-dom';
import { RouteType } from '../../routes';
import DefaultLayout from '../../layouts/DefaultLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

const RoutePage = (route: RouteType, index: number) => {
  const Layout = route.layout || DefaultLayout;
  const Page = route.element;
  const ChildrenNode = route.children ?? [];
  return (
    <Route
      key={route.path + index}
      path={route.path}
      element={
        <ProtectedRoute route={route}>
          <Layout>
            <Page />
          </Layout>
        </ProtectedRoute>
      }
    >
      {ChildrenNode.map((routeObject, index: number) =>
        RoutePage(routeObject, index),
      )}
    </Route>
  );
};
export default RoutePage;
