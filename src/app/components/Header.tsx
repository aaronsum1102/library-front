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

const Header = (): JSX.Element => {
  const { setDrawerOpen } = useApp();

  return (
    <StyledAppBar elevation={0} position="static" component="header">
      <Container maxWidth="xl" component="section">
        <Toolbar disableGutters>
          <IconButton edge="start" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
