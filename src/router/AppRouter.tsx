import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { RouteDefinition } from '../routes';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '~app/hooks';

interface AppRouterProps {
  routes: RouteDefinition[];
  verificationRoutes: RouteDefinition[];
  getView: (
    routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => JSX.Element;
  getNotFoundView: (
    routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => JSX.Element;
}

interface RouteState {
  fromVerify?: boolean;
}

export const AppRouter = ({
  routes,
  verificationRoutes,
  getView,
  getNotFoundView
}: AppRouterProps): JSX.Element => {
  const { user } = useAuth();

  return (
    <Switch>
      {verificationRoutes.map((route) => (
        <Route
          key={`view.${route.name}`}
          exact={route.exact}
          path={route.path}
          render={(props: RouteComponentProps) => {
            if (
              (props.location.state as RouteState)?.fromVerify ||
              (!user && new RegExp(/\?apiKey=.+oobCode=.+mode=signIn/g).test(props.location.search))
            ) {
              return getView(route, props);
            } else {
              return getNotFoundView(null, props);
            }
          }}
        />
      ))}
      {routes.map((route) => {
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
