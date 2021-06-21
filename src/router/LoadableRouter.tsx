import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import loadable from '@loadable/component';
import { RouteDefinition, protectedRoutes, authRoutes } from '../routes';
import AppRouter from './AppRouter';

const LoadableView = loadable(
  (props: { view: string }) => import(`../app/views/${props.view}/index`)
);

const LoadableRouter = (): JSX.Element => {
  const getView = (routeDefinition: RouteDefinition | null, routeProps: RouteComponentProps) => (
    <LoadableView {...routeProps} view={routeDefinition?.view || 'NotFoundView'} />
  );

  const getNotFoundView = (
    _routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => <LoadableView {...routeProps} view="NotFoundView" />;

  return (
    <AppRouter
      protectedRoutes={protectedRoutes}
      authRoutes={authRoutes}
      getView={getView}
      getNotFoundView={getNotFoundView}
    />
  );
};

export default LoadableRouter;
