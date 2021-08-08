import React from 'react';
import { Typography } from '@material-ui/core';

import { LoansProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { LoansTable } from '~app/modules';

const HomeView = (): JSX.Element => {
  return (
    <LoansProvider>
      <Typography variant="h4">Loans</Typography>
      <Spacer space={Spacings.xLarge} />

      <LoansTable />
      <Spacer space={Spacings.xLarge} />
    </LoansProvider>
  );
};

export default HomeView;
