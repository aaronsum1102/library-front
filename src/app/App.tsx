import React from 'react';
import { Typography } from '@material-ui/core';

import { LoadableRouter } from '~src/router';
import { Header, Drawer, PageContent, Loader } from '~app/components';
import { useAuth } from '~app/hooks';

const App = (): JSX.Element => {
  const { isInitAuth } = useAuth();

  const userId = window.localStorage.getItem('userId');

  return (
    <>
      <Header />

      <Drawer />

      {isInitAuth ? (
        <Loader color="primary" thickness={5} showText={!userId}>
          <Typography variant="h6">Authenticating</Typography>
        </Loader>
      ) : (
        <PageContent>
          <LoadableRouter />
        </PageContent>
      )}
    </>
  );
};

export default App;
