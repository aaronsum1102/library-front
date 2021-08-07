import { createContext } from 'react';
import { SortDirection } from '@material-ui/core';
import { ApolloError } from '@apollo/client';

import { Resource } from '~app/apollo/generated/graphql';
import { Action } from '~app/components';

export type TypeFilter = boolean | null;
export type AvailabilityFilter = boolean | null;

export interface ResourceData extends Resource {
  availableFrom: string;
}

export interface ResourceTableData {
  title: string;
  ebook: boolean;
  available: boolean;
  availableFrom: string;
}

export interface ResourcesState {
  titleFilter: string;
  typeFilter: TypeFilter;
  availabilityFilter: AvailabilityFilter;

  resources: ResourceData[];
  loading: boolean;
  error?: ApolloError;
  order: SortDirection;
  orderBy: keyof ResourceTableData;

  setTitleFilter: (value: string) => void;
  setTypeFilter: (value: TypeFilter) => void;
  setAvailabilityFilter: (value: AvailabilityFilter) => void;
  onRequestSort: (property: keyof ResourceTableData) => void;
  onRequestBorrow: Action['onClick'];
}

export const ResourcesContext = createContext<ResourcesState | null>(null);
