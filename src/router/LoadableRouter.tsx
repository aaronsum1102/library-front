import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import loadable from '@loadable/component';

import { RouteDefinition, routes } from '../routes';
import AppRouter from './AppRouter';

const LoadableView = loadable(
  (props: { view: string }) => import(`../app/views/${props.view}/index`)
);

interface LoadableRouterProps {
  authenticated: boolean;
  admin: boolean;
}

const LoadableRouter = ({ authenticated, admin }: LoadableRouterProps): JSX.Element => {
  const getView = (routeDefinition: RouteDefinition | null, routeProps: RouteComponentProps) => (
    <LoadableView {...routeProps} view={routeDefinition?.view || 'NotFoundView'} />
  );

  const getNotFoundView = (
    _routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => <LoadableView {...routeProps} view="NotFoundView" />;

  return (
    <AppRouter
      authenticated={authenticated}
      admin={admin}
      routes={routes}
      getView={getView}
      getNotFoundView={getNotFoundView}
    />
  );
};

export default LoadableRouter;
