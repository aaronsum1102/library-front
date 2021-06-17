import React from 'react';
import { Typography } from '@material-ui/core';
import { Center, Spacer, Spacings } from '~app/components';

const NotifyView = (): JSX.Element => {
  return (
    <Center>
      <Typography variant="h3">Email Address Confirmed</Typography>
      <Spacer space={Spacings.xLarge} />
      <Typography>You have been successfully authenticated.</Typography>
    </Center>
  );
};

export default NotifyView;
