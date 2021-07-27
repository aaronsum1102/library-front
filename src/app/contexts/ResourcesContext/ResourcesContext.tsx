import { createContext } from 'react';
import { SortDirection } from '@material-ui/core';

import { Action } from '~app/components';

export type TypeFilter = 'all' | 'book' | 'eBook';
export type AvailabilityFilter = 'all' | 'yes' | 'no';

export interface ResourceData {
  title: string;
  type: string;
  availability: string;
  availableFrom: string;
}

export interface ResourcesState {
  titleFilter: string;
  typeFilter: TypeFilter;
  availabilityFilter: AvailabilityFilter;

  items: ResourceData[];
  order: SortDirection;
  orderBy: keyof ResourceData;

  setTitleFilter: (value: string) => void;
  setTypeFilter: (value: TypeFilter) => void;
  setAvailabilityFilter: (value: AvailabilityFilter) => void;
  onRequestSort: (property: keyof ResourceData) => void;
  onRequestBorrow: Action['onClick'];
}

export const ResourcesContext = createContext<ResourcesState | null>(null);
