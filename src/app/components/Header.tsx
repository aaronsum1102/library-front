import React from 'react';
import { Container, AppBar, Toolbar, styled } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useApp } from '~app/hooks';

const StyledAppBar = styled(AppBar)(({ theme }) => {
  const { palette } = theme;

  return {
    backgroundColor: palette.background.default
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => {
  const { breakpoints } = theme;

  return {
    paddingTop: '1rem',
    paddingBottom: '1rem',

    [breakpoints.up('sm')]: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem'
    }
  };
});

const Header = (): JSX.Element => {
  const { setDrawerOpen } = useApp();

  return (
    <StyledAppBar elevation={0} position="static" component="header">
      <Container maxWidth="xl" component="section">
        <StyledToolbar disableGutters>
          <IconButton edge="start" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
