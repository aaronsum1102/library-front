import React, { useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider, Box, styled } from '@material-ui/core';

import { AppContext, AppState } from './AppContext';
import { SnackbarProvider } from '../SnackbarContext';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%'
        },
        body: {
          height: '100%'
        },
        '#root': {
          height: '100%'
        }
      }
    },
    MuiContainer: {
      root: {
        '@media (min-width: 600px)': {
          paddingLeft: '3rem',
          paddingRight: '3rem'
        },
        '@media (min-width: 960px)': {
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem'
        },
        '@media (min-width: 1280px)': {
          paddingLeft: '6.5rem',
          paddingRight: '6.5rem'
        }
      }
    }
  }
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%'
});

const AppContextProvider: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value: AppState = {
    drawerOpen,
    setDrawerOpen
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={value}>
        <SnackbarProvider>
          <StyledBox>{children}</StyledBox>
        </SnackbarProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default AppContextProvider;
