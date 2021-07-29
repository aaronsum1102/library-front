import React from 'react';
import { Typography } from '@material-ui/core';

import { ResourcesProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { ResourceFilters, ResourcesTable } from '~app/modules';
import { useUserQuery } from '~app/apollo/generated/graphql';

const HomeView = (): JSX.Element => {
  useUserQuery({ variables: { email: 'sumsx03@gmail.com' } });

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
