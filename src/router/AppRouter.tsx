import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { RouteDefinition } from '../routes';
import ProtectedRoute from './ProtectedRoute';

interface AppRouterProps {
  authenticated: boolean;
  admin: boolean;
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
  admin,
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
            render={(props: RouteComponentProps) => {
              if (route.restricted && !admin) {
                return getNotFoundView(null, props);
              }

              return getView(route, props);
            }}
          />
        );
      })}
      <Route render={(props) => getNotFoundView(null, props)} />
    </Switch>
  );
};

export default AppRouter;
