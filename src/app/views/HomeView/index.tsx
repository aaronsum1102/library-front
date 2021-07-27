import React from 'react';
import { Typography } from '@material-ui/core';

import { ResourcesProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { ResourceFilters, ResourcesTable } from '~app/modules';

const HomeView = (): JSX.Element => {
  return (
    <>
      <Typography variant="h4">Resources</Typography>
      <Spacer space={Spacings.xLarge} />
      <ResourcesProvider>
        <ResourceFilters />
        <Spacer space={Spacings.xLarge} />
        <ResourcesTable />
        <Spacer space={Spacings.xLarge} />
      </ResourcesProvider>
    </>
  );
};

export default HomeView;
