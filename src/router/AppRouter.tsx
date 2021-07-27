import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { RouteDefinition } from '../routes';
import ProtectedRoute from './ProtectedRoute';

interface AppRouterProps {
  authenticated: boolean;
  routes: RouteDefinition[];
  getView: (
    routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => JSX.Element;
  getNotFoundView: (
    routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => JSX.Element;
}

const AppRouter = ({
  authenticated,
  routes,
  getView,
  getNotFoundView
}: AppRouterProps): JSX.Element => {
  return (
    <Switch>
      {routes.map((route) => {
        const Component = route.private ? ProtectedRoute : Route;

        return (
          <Component
            key={`view.${route.name}`}
            exact={route.exact}
            path={route.path}
            authenticated={authenticated}
            render={(props: RouteComponentProps) => getView(route, props)}
          />
        );
      })}
      <Route render={(props) => getNotFoundView(null, props)} />
    </Switch>
  );
};

export default AppRouter;
