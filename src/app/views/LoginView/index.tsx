import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '~app/hooks';
import { generateRouteUrl } from '~src/routes';

import { Center } from '~app/components';
import { LoginForm, AuthenticatingInfo } from './components';

const LoginView = (): JSX.Element => {
  const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);
  const [email, setEmail] = useState('');

  const { user, sendSignInLink } = useAuth();

  const sendSignInLinkCallback = async (email: string) => {
    setEmail(email);
    const result = await sendSignInLink(email);
    result && setIsWaitingForVerification(true);
    return result;
  };

  if (user) {
    return <Redirect to={generateRouteUrl('home')} />;
  }

  return (
    <Center>
      {!isWaitingForVerification ? (
        <LoginForm sendSignInLink={sendSignInLinkCallback} />
      ) : (
        <AuthenticatingInfo email={email} />
      )}
    </Center>
  );
};

export default LoginView;
