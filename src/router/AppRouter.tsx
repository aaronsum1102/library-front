import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import {
  RouteDefinition,
  generateRouteUrl,
  VerifyViewRouteState,
  LoginViewRouteState
} from '../routes';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '~app/hooks';

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

export const AppRouter = ({
  protectedRoutes,
  authRoutes,
  getView,
  getNotFoundView
}: AppRouterProps): JSX.Element => {
  const { user } = useAuth();

  return (
    <Switch>
      {authRoutes.map((route) => (
        <Route
          key={`view.${route.name}`}
          exact={route.exact}
          path={route.path}
          render={(props: RouteComponentProps) => {
            if (
              (props.match.path == generateRouteUrl('login') &&
                (props.location.state as LoginViewRouteState)?.isAuthRequired) ||
              (props.location.state as VerifyViewRouteState)?.fromVerify ||
              (!user && new RegExp(/\?apiKey=.+oobCode=.+mode=signIn/g).test(props.location.search))
            ) {
              return getView(route, props);
            } else {
              return getNotFoundView(null, props);
            }
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
