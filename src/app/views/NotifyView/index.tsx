import React from 'react';
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { NotifyViewRouteState, generateRouteUrl } from '~root/src/routes';
import { Center, Spacer, Spacings } from '~app/components';

const isRedirectFromVerifyView = (location: RouteComponentProps['location']): boolean => {
  return Boolean((location.state as NotifyViewRouteState)?.fromVerify);
};

const NotifyView = (): JSX.Element => {
  const location = useLocation();

  if (!isRedirectFromVerifyView(location)) {
    return <Redirect to={generateRouteUrl('login')} />;
  }

  return (
    <Center>
      <Typography variant="h3">Email Address Confirmed</Typography>
      <Spacer space={Spacings.xLarge} />
      <Typography>You have been successfully authenticated.</Typography>
    </Center>
  );
};

export default NotifyView;
