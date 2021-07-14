import React from 'react';
import { Box, Drawer, Button, styled } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useApp, useAuth } from '~app/hooks';
import { Spacer, Spacings } from '~app/components';
import { protectedRoutes } from '~src/routes';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100vw'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.up('md')]: {
      width: '33%'
    }
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: '1rem 1rem 1rem 2rem',
  [theme.breakpoints.up('sm')]: {
    padding: '2rem 2rem 2rem 4rem'
  }
}));

const StyledIcon = styled(ArrowForwardIcon)(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const AppDrawer = (): JSX.Element => {
  const { drawerOpen, setDrawerOpen } = useApp();
  const { user } = useAuth();

  const onClose = () => setDrawerOpen(false);

  return (
    <StyledDrawer anchor="left" open={drawerOpen} onClose={onClose}>
      <StyledBox>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Button href="/profile">
              <StyledIcon fontSize="small" color="secondary" />
              {user?.email}{' '}
            </Button>
          </Box>

          <IconButton edge="start" color="default" aria-label="menu" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Spacer space={Spacings.xLarge} />

        <Box component="nav">
          {protectedRoutes.map(({ label, path }) => (
            <Button key={label} href={path}>
              {label}
            </Button>
          ))}
        </Box>
      </StyledBox>
    </StyledDrawer>
  );
};

export default AppDrawer;
