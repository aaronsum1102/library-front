import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUsersQuery, User, useAddUserMutation } from '~app/apollo/generated/graphql';
import { UserContext } from './UserContext';
import { useSnackbar } from '~app/hooks';

const UserProvider: React.FC = ({ children }) => {
  const [userFilter, setUserFilter] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<boolean | null>(null);

  const { addSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const { data, loading, error, refetch } = useUsersQuery();
  const [addUser] = useAddUserMutation({
    onCompleted() {
      addSnackbar({
        content: t('user:addUserSuccessMessage')
      });
    },
    onError(err) {
      const userExist =
        err.graphQLErrors.length &&
        err.graphQLErrors[0].extensions?.exception?.errorInfo.code === 'auth/email-already-exists';

      addSnackbar({
        content: userExist ? t('user:existingUserErrorMessage') : t('user:addUserFailureMessage'),
        error: true
      });
    }
  });

  const users = useMemo(() => {
    if (!data) {
      return null;
    }

    const usersData = data.users as User[];

    return usersData
      .filter((user) => user?.email.includes(userFilter) || user?.displayName?.includes(userFilter))
      .filter((user) => {
        if (userTypeFilter === null) {
          return true;
        }

        return user.admin === userTypeFilter;
      });
  }, [data, userFilter, userTypeFilter]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        userFilter,
        userTypeFilter,
        setUserFilter,
        setUserTypeFilter,
        addUser,
        refetchUsers: refetch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
