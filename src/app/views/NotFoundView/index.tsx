import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { generateRouteUrl } from '~src/routes';
import { Center } from '~app/components';

const NotFoundView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Center>
      <Typography variant="h3" color="textSecondary" paragraph>
        404
      </Typography>
      <Typography variant="h4" paragraph>
        {t('error:notFound')}
      </Typography>

      <Typography variant="body1">
        <Link href={generateRouteUrl('home')}>{t('button:clickHere')}</Link>{' '}
        {t('general:toHomePage')}
      </Typography>
    </Center>
  );
};

export default NotFoundView;
