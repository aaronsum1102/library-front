import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { generateRouteUrl } from '../routes';
import { useAuth } from '~app/hooks';

interface ProtectedRouteProps extends RouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo, ...props }: ProtectedRouteProps): JSX.Element => {
  const { user } = useAuth();

  if (!user) return <Redirect to={generateRouteUrl('login')} />;

  return <Route {...props} />;
};
