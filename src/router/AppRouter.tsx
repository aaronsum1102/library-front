import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { RouteDefinition, generateRouteUrl, VerifyViewRouteState } from '../routes';
import ProtectedRoute from './ProtectedRoute';

interface AppRouterProps {
  protectedRoutes: RouteDefinition[];
  authRoutes: RouteDefinition[];
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
  protectedRoutes,
  authRoutes,
  getView,
  getNotFoundView
}: AppRouterProps): JSX.Element => {
  return (
    <Switch>
      {authRoutes.map((route) => (
        <Route
          key={`view.${route.name}`}
          exact={route.exact}
          path={route.path}
          render={(props: RouteComponentProps) => {
            if (
              props.match.path === generateRouteUrl('login') ||
              (props.location.state as VerifyViewRouteState)?.fromVerify ||
              new RegExp(/\?apiKey=.+oobCode=.+mode=signIn/g).test(props.location.search)
            ) {
              return getView(route, props);
            }

            return getNotFoundView(null, props);
          }}
        />
      ))}

      {protectedRoutes.map((route) => {
        const Component = route.private ? ProtectedRoute : Route;
        return (
          <Component
            key={`view.${route.name}`}
            exact={route.exact}
            path={route.path}
            render={(props: RouteComponentProps) => {
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
