import React from 'react';
import { Container, CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';

import { LoadableRouter } from '~src/router';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%'
        },
        body: {
          height: '100%'
        }
      }
    },
    MuiContainer: {
      root: {
        height: '100%'
      }
    }
  }
});

const App = (): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <LoadableRouter />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
