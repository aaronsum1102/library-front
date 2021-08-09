import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ResourcesProvider, ResourceActionProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { ResourceFilters, ResourcesTable, AddResourceMenu } from '~app/modules';

const HomeView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <ResourcesProvider>
      <ResourceActionProvider>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h4">{t('catalogue:catalogue')}</Typography>
          </Box>
          <AddResourceMenu />
        </Box>
        <Spacer space={Spacings.xLarge} />
        <ResourceFilters />
        <Spacer space={Spacings.xLarge} />
        <ResourcesTable />
        <Spacer space={Spacings.xLarge} />
      </ResourceActionProvider>
    </ResourcesProvider>
  );
};

export default HomeView;
