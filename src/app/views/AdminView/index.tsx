import React from 'react';
import { Typography, Box } from '@material-ui/core';

import { UserProvider } from '~app/contexts';
import { Spacer, Spacings } from '~app/components';
import { UsersTable } from '~app/modules';

const AdminView = (): JSX.Element => {
  return (
    <>
      <Box display="flex">
        <Box>
          <Typography variant="h4">Admin</Typography>
          <Typography variant="h5">User management</Typography>
        </Box>
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
