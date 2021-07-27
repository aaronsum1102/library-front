import { createContext } from 'react';
import { SortDirection } from '@material-ui/core';

import { DataTabelProps } from '~app/components';

export type TypeFilter = 'all' | 'book' | 'eBook';
export type AvailabilityFilter = 'all' | 'yes' | 'no';

export interface ResourceData {
  title: string;
  resourceType: string;
  availability: string;
  availableFrom: string;
}

export type HeadDetails = DataTabelProps<ResourceData>['headDetails'];
export type Actions = DataTabelProps<ResourceData>['actions'];

export interface ResourcesState {
  titleFilter: string;
  typeFilter: TypeFilter;
  availabilityFilter: AvailabilityFilter;
  fields: Array<keyof ResourceData>;
  headDetails: HeadDetails;
  items: ResourceData[];
  actions: Actions;
  order: SortDirection;
  orderBy: keyof ResourceData;

  setTitleFilter: (value: string) => void;
  setTypeFilter: (value: TypeFilter) => void;
  setAvailabilityFilter: (value: AvailabilityFilter) => void;
  onRequestSort: (property: keyof ResourceData) => void;
}

export const ResourcesContext = createContext<ResourcesState | null>(null);
