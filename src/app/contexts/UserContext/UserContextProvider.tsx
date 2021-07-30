import React, { useState, useMemo } from 'react';

import { useUsersQuery, User } from '~app/apollo/generated/graphql';
import { UserContext, UserState } from './UserContext';

const UserProvider: React.FC = ({ children }) => {
  const [userFilter, setUserFilter] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<boolean | null>(null);

  const { data, loading, error } = useUsersQuery();

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

  const value: UserState = {
    users,
    loading,
    error,
    userFilter,
    userTypeFilter,
    setUserFilter,
    setUserTypeFilter
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
