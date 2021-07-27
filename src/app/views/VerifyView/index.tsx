import React, { useEffect, useRef } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { generateRouteUrl, NotifyViewRouteState } from '~src/routes';
import { useAuth } from '~app/hooks';
import { Center, Loader, LoginForm } from '~app/components';

const isVerifyView = (search: string): boolean => {
  return new RegExp(/\?apiKey=.+oobCode=.+mode=signIn/g).test(search);
};

const VerifyView = (): JSX.Element => {
  const emailFromLocalStorage = useRef(window.localStorage.getItem('emailForSignIn'));
  const { search } = useLocation();
  const { user, signIn } = useAuth();
  const authenticated = Boolean(user);

  useEffect(() => {
    if (emailFromLocalStorage.current) {
      signIn(emailFromLocalStorage.current);
    }
  }, []);

  if (!isVerifyView(search)) {
    return <Redirect to={generateRouteUrl('login')} />;
  }

  if (authenticated) {
    if (emailFromLocalStorage.current) {
      return (
        <Redirect
          to={{
            pathname: generateRouteUrl('notify'),
            state: { fromVerify: true } as NotifyViewRouteState
          }}
        />
      );
    }

    return <Redirect to={generateRouteUrl('home')} />;
  }

  return (
    <Center>
      {!emailFromLocalStorage.current ? (
        <LoginForm buttonText="Verify" onSubmitCallback={signIn} />
      ) : (
        <>
          <Loader thickness={6} color="primary">
            <Typography variant="h5">Verifying</Typography>
          </Loader>
        </>
      )}
    </Center>
  );
};

export default VerifyView;
