import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';
import { Spacer, Spacings } from '~app/components';

interface Props {
  email: string;
}

const AuthenticatingInfo = ({ email }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4">{t('auth:awaitingConfirmation')}</Typography>
      <Spacer space={Spacings.xLarge} />
      <Typography>
        <b>{t('auth:infoText')}</b>
      </Typography>
      <Spacer />
      <Typography color="textSecondary" paragraph>
        {t('auth:sendEmailInfoText')}
        <Typography variant="body1" component="span" color="textPrimary">
          <b>{email}</b>
        </Typography>
      </Typography>
    </>
  );
};

export default AuthenticatingInfo;
