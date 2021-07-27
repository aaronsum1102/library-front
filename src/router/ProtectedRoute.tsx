import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { generateRouteUrl } from '../routes';

interface ProtectedRouteProps extends RouteProps {
  authenticated: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const { authenticated } = props;

  if (!authenticated) {
    return <Redirect to={generateRouteUrl('login')} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
