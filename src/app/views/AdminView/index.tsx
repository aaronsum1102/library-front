import React from 'react';
import { Typography, Box } from '@material-ui/core';

import { UserProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { UsersTable, AddUser } from '~app/modules';

const AdminView = (): JSX.Element => {
  return (
    <>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h4">Admin</Typography>
          <Typography variant="h5">User management</Typography>
        </Box>
        <AddUser />
      </Box>
      <Spacer space={Spacings.xLarge} />
      <UserProvider>
        <UsersTable />
      </UserProvider>
      <Spacer space={Spacings.xLarge} />
    </>
  );
};

export default AdminView;
