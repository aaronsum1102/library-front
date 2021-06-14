import React from 'react';
import { Container } from '@material-ui/core';

import { LoadableRouter } from '~src/router';

const App = (): JSX.Element => {
  return (
    <Container maxWidth="xl">
      <LoadableRouter />
    </Container>
  );
};

export default App;
