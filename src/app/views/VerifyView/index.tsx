import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

import { Typography } from '@material-ui/core';
import { Center, Loader, LoginForm } from '~app/components';

const VerifyView = (): JSX.Element => {
  const { user, signIn } = useAuth();
  const emailFromLocalStorage = useRef(window.localStorage.getItem('emailForSignIn'));

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
    } else {
      return <Redirect to={generateRouteUrl('home')} />;
    }
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
