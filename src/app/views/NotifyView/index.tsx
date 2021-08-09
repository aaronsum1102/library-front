import React from 'react';
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom';
import { Typography, Box, styled } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  if (!isRedirectFromVerifyView(location)) {
    return <Redirect to={generateRouteUrl('login')} />;
  }

  return (
    <Container>
      <Center>
        <Typography variant="h4" align="center">
          {t('login:emailConfirmed')}
        </Typography>
        <Spacer space={Spacings.xLarge} />
        <Typography align="center">{t('login:emailConfirmedMessage')}</Typography>
      </Center>
    </Container>
  );
};

export default NotifyView;
