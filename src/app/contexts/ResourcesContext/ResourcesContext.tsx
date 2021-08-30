import { createContext } from 'react';
import { SortDirection } from '@material-ui/core';
import { ApolloError, ApolloQueryResult } from '@apollo/client';

import { Resource as ResourceResponse, ResourcesQuery } from '~app/apollo/generated/graphql';

export type TypeFilter = boolean | null;
export type AvailabilityFilter = boolean | null;

export interface ResourceTableData {
  title: string;
  ebook: string;
  available: string;
  dueDate: string;
  borrowerName: string;
  borrowerPhoneNumber: string;
}

export interface Resource extends ResourceResponse {
  title: string;
  ebook: boolean;
  available: boolean;
  dueDate: string;
  borrowerName: string;
  borrowerPhoneNumber: string;
}

export interface ResourcesState {
  titleFilter: string;
  typeFilter: TypeFilter;
  availabilityFilter: AvailabilityFilter;

  resources: Resource[];
  loading: boolean;
  error?: ApolloError;
  order: SortDirection;
  orderBy: keyof ResourceTableData;

  setTitleFilter: (value: string) => void;
  setTypeFilter: (value: TypeFilter) => void;
  setAvailabilityFilter: (value: AvailabilityFilter) => void;
  onRequestSort: (property: keyof ResourceTableData) => void;
  refetchResources: () => Promise<ApolloQueryResult<ResourcesQuery>>;
}

export const ResourcesContext = createContext<ResourcesState | null>(null);
