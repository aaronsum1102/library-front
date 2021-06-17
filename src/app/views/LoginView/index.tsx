import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '~app/hooks';
import { generateRouteUrl } from '~src/routes';

import { Center, LoginForm } from '~app/components';
import { AuthenticatingInfo } from './components';

const LoginView = (): JSX.Element => {
  const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);
  const [email, setEmail] = useState('');

  const { user, sendSignInLink } = useAuth();

  const sendSignInLinkCallback = useCallback(
    async (finalEmail: string) => {
      setEmail(finalEmail);
      const result = await sendSignInLink(finalEmail);

      if (result) setIsWaitingForVerification(true);

      return result;
    },
    [setEmail, sendSignInLink, setIsWaitingForVerification]
  );

  if (user) {
    return <Redirect to={generateRouteUrl('home')} />;
  }

  return (
    <Center>
      {!isWaitingForVerification ? (
        <LoginForm buttonText="Log in" onSubmitCallback={sendSignInLinkCallback} />
      ) : (
        <AuthenticatingInfo email={email} />
      )}
    </Center>
  );
};

export default LoginView;
