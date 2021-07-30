import { createContext } from 'react';
import { ApolloError } from '@apollo/client';

import { User } from '~app/apollo/generated/graphql';

export interface UserState {
  users: User[] | null;
  loading: boolean;
  error?: ApolloError;
  userFilter: string;
  userTypeFilter: boolean | null;
  setUserFilter: (value: string) => void;
  setUserTypeFilter: (value: boolean | null) => void;
}

export const UserContext = createContext<UserState | null>(null);
