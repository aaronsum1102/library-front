import React from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  Typography
} from '@material-ui/core';
import { LoadableRouter } from '~src/router';
import { Loader } from '~app/components';
import { useAuth } from '~app/hooks';

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
  const { isInitAuth } = useAuth();
  const userId = window.localStorage.getItem('userId');

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          {isInitAuth ? (
            <Loader color="primary" thickness={5} showText={!userId}>
              <Typography variant="h6">Authenticating</Typography>
            </Loader>
          ) : (
            <LoadableRouter />
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
