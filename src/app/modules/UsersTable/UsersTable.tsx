import React from 'react';
import { Box, Typography, styled } from '@material-ui/core';

import { User } from '~app/apollo/generated/graphql';
import { useUser } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader, Spacer, Spacings, Option } from '~app/components';
import TableAction from './components';

const StyledParagraph = styled(Typography)({
  padding: '1rem'
});

interface UserItem extends Omit<User, 'uid' | '__typename' | 'admin'> {
  admin: string;
}

const fields: Array<keyof UserItem> = ['email', 'displayName', 'phoneNumber', 'admin'];

const headDetails: DataTabelProps<UserItem>['headDetails'] = {
  email: {
    label: 'Emai',
    width: '30%'
  },
  displayName: {
    label: 'Name',
    width: '30%'
  },
  phoneNumber: {
    label: 'Phone number',
    width: '30%'
  },
  admin: {
    label: 'Admin',
    width: 'fit-content'
  }
};

const userTypeOptions: Option<boolean | null>[] = [
  { label: 'All', value: null },
  { label: 'Admin', value: true },
  { label: 'Normal user', value: false }
];

const UsersTable = (): JSX.Element => {
  const { users, loading, error, userFilter, userTypeFilter, setUserFilter, setUserTypeFilter } =
    useUser();

  if (loading) {
    return <Loader />;
  }

  if (error || !users) {
    return <Typography>Failed to load user. Please try again later.</Typography>;
  }

  const items = users.map((user) => ({
    ...user,
    displayName: user.displayName || '-',
    phoneNumber: user.phoneNumber || '-',
    admin: user.admin ? 'Yes' : 'No'
  }));

  return (
    <>
      <TableAction
        value={userFilter}
        userTypeFilter={userTypeFilter}
        userTypeOptions={userTypeOptions}
        onValueChange={setUserFilter}
        onUserTypeFilterChange={setUserTypeFilter}
      />
      <Spacer space={Spacings.xLarge} />
      <Box>
        <DataTabel<UserItem> fields={fields} headDetails={headDetails} items={items} />
        {items.length === 0 && <StyledParagraph>No user availiable</StyledParagraph>}
      </Box>
    </>
  );
};

export default UsersTable;
