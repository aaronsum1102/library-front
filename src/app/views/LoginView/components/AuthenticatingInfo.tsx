import React from 'react';

import { Typography } from '@material-ui/core';
import { Spacer, Spacings } from '~app/components';

interface Props {
  email: string;
}

const AuthenticatingInfo = ({ email }: Props): JSX.Element => {
  return (
    <>
      <Typography variant="h3">Awaiting Confirmation</Typography>
      <Spacer space={Spacings.xLarge} />
      <Typography>
        <b>Do not close this window untill opening the email link</b>
      </Typography>
      <Spacer />
      <Typography color="textSecondary" paragraph>
        We just sent an email to{' '}
        <Typography variant="body1" component="span" color="textPrimary">
          <b>{email}</b>
        </Typography>
      </Typography>
    </>
  );
};

export default AuthenticatingInfo;
