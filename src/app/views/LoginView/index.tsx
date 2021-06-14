import React from 'react';
import { Redirect } from 'react-router-dom';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

const LoginView = (): JSX.Element => {
  const { user, sendSignInLink } = useAuth();

  if (user) {
    return <Redirect to={generateRouteUrl('home')} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Continue with email</p>
      <button onClick={() => sendSignInLink('sumsx03@gmail.com')}>singn in</button>
    </div>
  );
};

export default LoginView;
