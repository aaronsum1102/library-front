import React from 'react';
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom';
import { Typography, Box, styled } from '@material-ui/core';

import { NotifyViewRouteState, generateRouteUrl } from '~root/src/routes';
import { Spacer, Spacings, Center } from '~app/components';

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  marginTop: 'calc(-59px - 2rem)',

  [theme.breakpoints.up('sm')]: {
    marginTop: 'calc(-59px - 3rem)'
  }
}));

const isRedirectFromVerifyView = (location: RouteComponentProps['location']): boolean => {
  return Boolean((location.state as NotifyViewRouteState)?.fromVerify);
};

const NotifyView = (): JSX.Element => {
  const location = useLocation();

  if (!isRedirectFromVerifyView(location)) {
    return <Redirect to={generateRouteUrl('login')} />;
  }

  return (
    <Container>
      <Center>
        <Typography variant="h3" align="center">
          Email Address Confirmed
        </Typography>
        <Spacer space={Spacings.xLarge} />
        <Typography align="center">
          You have been successfully authenticated and may close this window now.
        </Typography>
      </Center>
    </Container>
  );
};

export default NotifyView;
