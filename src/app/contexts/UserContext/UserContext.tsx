import { createContext } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';

import { User, UsersQuery, AddUserMutationHookResult } from '~app/apollo/generated/graphql';

type AddUserMutate = AddUserMutationHookResult[0];

export interface UserState {
  users: User[] | null;
  loading: boolean;
  error?: ApolloError;
  userFilter: string;
  userTypeFilter: boolean | null;
  setUserFilter: (value: string) => void;
  setUserTypeFilter: (value: boolean | null) => void;
  addUser: AddUserMutate;
  refetchUsers: () => Promise<ApolloQueryResult<UsersQuery>>;
}

export const UserContext = createContext<UserState | null>(null);
