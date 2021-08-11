import React from 'react';
import { Box, Typography, styled } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { User } from '~app/apollo/generated/graphql';
import { useUser } from '~app/hooks';
import {
  DataTabel,
  DataTabelProps,
  Loader,
  Spacer,
  Spacings,
  DropdownOption
} from '~app/components';
import TableAction from './components';

const StyledParagraph = styled(Typography)({
  padding: '1rem'
});

interface UserItem extends Omit<User, 'uid' | '__typename' | 'admin'> {
  admin: string;
}

const fields: Array<keyof UserItem> = ['email', 'displayName', 'phoneNumber', 'admin'];

const UsersTable = (): JSX.Element => {
  const { users, loading, error, userFilter, userTypeFilter, setUserFilter, setUserTypeFilter } =
    useUser();
  const { t } = useTranslation();

  const items = users
    ? users.map((user) => ({
        ...user,
        displayName: user.displayName || '-',
        phoneNumber: user.phoneNumber || '-',
        admin: user.admin ? t('general:yes') : t('general:no')
      }))
    : [];

  const headDetails: DataTabelProps<UserItem>['headDetails'] = {
    email: {
      label: t('genral:email'),
      width: '30%'
    },
    displayName: {
      label: t('genral:name'),
      width: '30%'
    },
    phoneNumber: {
      label: t('genral:phoneNumber'),
      width: '30%'
    },
    admin: {
      label: t('general:admin'),
      width: 'fit-content'
    }
  };

  const userTypeOptions: DropdownOption<boolean | null>[] = [
    { label: t('general:all'), value: null },
    { label: t('genral:admin'), value: true },
    { label: t('genral:normalUser'), value: false }
  ];

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
      </Box>

      <Box padding="1rem">
        {loading && <Loader />}

        {!loading && (error || !items) && <Typography>{t('user:loadUserError')}</Typography>}

        {!loading && !error && items.length === 0 && (
          <StyledParagraph>{t('user:noUser')}</StyledParagraph>
        )}
      </Box>
    </>
  );
};

export default UsersTable;
