import { createContext } from 'react';
import {
  BorrowResourceMutationHookResult,
  AddResourceMutationHookResult
} from '~app/apollo/generated/graphql';

type BorrowAction = BorrowResourceMutationHookResult[0];
type AddAction = AddResourceMutationHookResult[0];

export interface ResourceAction {
  borrow: BorrowAction;
  add: AddAction;
}

export const ResourceActionContext = createContext<ResourceAction | null>(null);
