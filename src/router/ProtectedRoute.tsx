import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { generateRouteUrl } from '../routes';
import { useAuth } from '~app/hooks';
import { Loader } from '~app/components';

export const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const { user, isInitAuth } = useAuth();

  if (isInitAuth) return <Loader text="Authenticating" color="primary" thickness={5} />;

  if (!user)
    return (
      <Redirect to={{ pathname: generateRouteUrl('login'), state: { isAuthRequired: true } }} />
    );

  return <Route {...props} />;
};
