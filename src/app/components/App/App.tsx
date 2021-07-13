import React, { useState } from 'react';
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  AppBar,
  Toolbar,
  Slide,
  useScrollTrigger,
  Drawer,
  Button
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { theme, useStyles } from './etc/style';
import { LoadableRouter } from '~src/router';
import { Loader, Spacer, Spacings } from '~app/components';
import { useAuth } from '~app/hooks';

const App = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isInitAuth, user } = useAuth();
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const userId = window.localStorage.getItem('userId');

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar classes={{ root: classes.appBar }} elevation={0}>
            <Toolbar disableGutters>
              <IconButton edge="start" aria-label="menu" onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>

        <Drawer
          classes={{ paper: classes.paper }}
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box padding="2rem 2rem 2rem 4rem" height="100%">
            <Box display="flex" justifyContent="spaceBetween" alignItems="center">
              <Box flexGrow={1}>
                <Button href="/profile">
                  <ArrowForwardIcon
                    classes={{ root: classes.icon }}
                    fontSize="small"
                    color="secondary"
                  />
                  {user?.email}{' '}
                </Button>
              </Box>

              <IconButton
                edge="start"
                color="default"
                aria-label="menu"
                onClick={() => setIsDrawerOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Spacer space={Spacings.xLarge} />
            <Box component="nav">
              <Button href="/">Resources</Button>
            </Box>
          </Box>
        </Drawer>

        <Container maxWidth="xl">
          <Box className={classes.box} height="100%">
            {isInitAuth ? (
              <Loader color="primary" thickness={5} showText={!userId}>
                <Typography variant="h6">Authenticating</Typography>
              </Loader>
            ) : (
              <Box marginTop="4rem" height="100%">
                <LoadableRouter />
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
