import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import loadable from '@loadable/component';

import { RouteDefinition, routes, verificationRoutes } from '../routes';
import { AppRouter } from './AppRouter';

const LoadableView = loadable(
  (props: { view: string }) => import(`../app/views/${props.view}/index`)
);

export const LoadableRouter = (): JSX.Element => {
  const getView = (routeDefinition: RouteDefinition | null, routeProps: RouteComponentProps) => (
    <LoadableView {...routeProps} view={routeDefinition?.view || 'NotFoundView'} />
  );

  const getNotFoundView = (
    _routeDefinition: RouteDefinition | null,
    routeProps: RouteComponentProps
  ) => <LoadableView {...routeProps} view="NotFoundView" />;

  return (
    <AppRouter
      routes={routes}
      verificationRoutes={verificationRoutes}
      getView={getView}
      getNotFoundView={getNotFoundView}
    />
  );
};