import { createContext } from 'react';
import {
  BorrowResourceMutationHookResult,
  AddResourceMutationHookResult,
  RemoveResourceMutationHookResult
} from '~app/apollo/generated/graphql';

type BorrowAction = BorrowResourceMutationHookResult[0];
type AddAction = AddResourceMutationHookResult[0];
type RemoveAction = RemoveResourceMutationHookResult[0];

export interface ResourceAction {
  borrow: BorrowAction;
  add: AddAction;
  remove: RemoveAction;
}

export const ResourceActionContext = createContext<ResourceAction | null>(null);
