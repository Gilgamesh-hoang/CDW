import { Route } from 'react-router-dom';
import { RouteType } from '../routes';
import DefaultLayout from '../layouts/DefaultLayout';

const RoutePage = (route: RouteType, index: number) => {
  const Layout = route.layout || DefaultLayout;
  const Page = route.element;
  const ChildrenNode = route.children ?? [];
  return (
    <Route
      key={index}
      path={route.path}
      element={
        <Layout>
          <Page />
        </Layout>
      }
    >
      {ChildrenNode.map((routeObject, index: number) =>
        RoutePage(routeObject, index)
      )}
    </Route>
  );
};
export default RoutePage;
