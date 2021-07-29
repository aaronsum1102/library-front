import React from 'react';
import { Typography } from '@material-ui/core';

import { UserProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { UsersTable } from '~app/modules';

const AdminView = (): JSX.Element => {
  return (
    <>
      <Typography variant="h4">UserManagement</Typography>
      <Spacer space={Spacings.xLarge} />
      <UserProvider>
        {/* <ResourceFilters />
        <Spacer space={Spacings.xLarge} /> */}
        <UsersTable />
        <Spacer space={Spacings.xLarge} />
      </UserProvider>
    </>
  );
};

export default AdminView;
