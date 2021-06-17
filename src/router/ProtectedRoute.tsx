import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { generateRouteUrl } from '../routes';
import { useAuth } from '~app/hooks';

import { Loader } from '~app/components';

const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const { user, isInitAuth } = useAuth();

  if (isInitAuth) {
    return (
      <Loader color="primary" thickness={5}>
        <Typography variant="h6">Authenticating</Typography>
      </Loader>
    );
  }

  if (!user) {
    return (
      <Redirect to={{ pathname: generateRouteUrl('login'), state: { isAuthRequired: true } }} />
    );
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
