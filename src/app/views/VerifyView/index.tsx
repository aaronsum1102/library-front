import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

import { Center, Loader, LoginForm } from '~app/components';

const VerifyView = (): JSX.Element => {
  const emailFromLocalStorage = useRef(window.localStorage.getItem('emailForSignIn'));

  const { user, signIn } = useAuth();

  useEffect(() => {
    if (emailFromLocalStorage.current) {
      signIn(emailFromLocalStorage.current);
    }
  }, []);

  if (user) {
    if (emailFromLocalStorage.current) {
      return (
        <Redirect
          to={{
            pathname: generateRouteUrl('notify'),
            state: { fromVerify: true }
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
