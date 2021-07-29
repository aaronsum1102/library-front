import React from 'react';

import { useUsersQuery, User } from '~app/apollo/generated/graphql';
import { UserContext, UserState } from './UserContext';

const UserProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useUsersQuery();

  const value: UserState = {
    users: (data?.users as User[]) || null,
    loading,
    error
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
