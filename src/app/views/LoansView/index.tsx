import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LoansProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { LoansTable } from '~app/modules';

const HomeView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <LoansProvider>
      <Typography variant="h4">{t('material:loans')}</Typography>
      <Spacer space={Spacings.xLarge} />

      <LoansTable />
      <Spacer space={Spacings.xLarge} />
    </LoansProvider>
  );
};

export default HomeView;
