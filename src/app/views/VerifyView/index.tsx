import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

const VerifyView = (): JSX.Element => {
  const { signIn } = useAuth();
  const history = useHistory();

  const email = window.localStorage.getItem('emailForSignIn');

  const loginUser = async (email: string) => {
    const result = await signIn(email);
    if (result) {
      history.replace(generateRouteUrl('notify'), {
        fromVerify: true
      });
    }
  };

  useEffect(() => {
    if (email) {
      loginUser(email);
    }
  }, []);

  return (
    <>
      {!email && (
        <div>
          <h1>Verify</h1>
          <p>Enter you email to verify {email}</p>
          <button onClick={() => loginUser('sumsx03@gmail.com')}>vefiry</button>
        </div>
      )}
    </>
  );
};

export default VerifyView;
