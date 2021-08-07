import { createContext } from 'react';
import { BorrowResourceMutationHookResult } from '~app/apollo/generated/graphql';

type BorrowAction = BorrowResourceMutationHookResult[0];

export interface ResourceAction {
  borrow: BorrowAction;
}

export const ResourceActionContext = createContext<ResourceAction | null>(null);
