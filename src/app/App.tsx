import React from 'react';
import { Typography } from '@material-ui/core';

import { LoadableRouter } from '~src/router';
import { Header, Drawer, PageContent, Loader } from '~app/components';
import { useAuth } from '~app/hooks';

const App = (): JSX.Element => {
  const { isInitAuth, user } = useAuth();
  const authenticated = Boolean(user);

  const userId = window.localStorage.getItem('userId');

  return (
    <>
      {authenticated && <Header />}

      {authenticated && <Drawer />}

      {isInitAuth ? (
        <Loader color="primary" thickness={5} showText={!userId}>
          <Typography variant="h6">Authenticating</Typography>
        </Loader>
      ) : (
        <PageContent>
          <LoadableRouter authenticated={authenticated} admin={user?.admin || false} />
        </PageContent>
      )}
    </>
  );
};

export default App;
