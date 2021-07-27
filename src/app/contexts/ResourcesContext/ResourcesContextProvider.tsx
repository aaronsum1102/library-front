import React, { useState, useCallback } from 'react';
import { SortDirection } from '@material-ui/core';

import {
  ResourcesContext,
  ResourcesState,
  TypeFilter,
  AvailabilityFilter,
  ResourceData,
  HeadDetails,
  Actions
} from './ResourcesContext';

const fields: Array<keyof ResourceData> = [
  'title',
  'resourceType',
  'availability',
  'availableFrom'
];

const headDetails: HeadDetails = {
  title: {
    label: 'Title',
    sortable: true,
    width: '40%'
  },
  resourceType: {
    label: 'Resource type'
  },
  availability: {
    label: 'Availability'
  },
  availableFrom: {
    label: 'Available from',
    sortable: true
  }
};

const items: ResourceData[] = [
  {
    title: 'Test Title',
    resourceType: 'book',
    availability: 'Yes',
    availableFrom: new Date().toDateString()
  },
  {
    title: 'Lorem ipsum',
    resourceType: 'eBook',
    availability: 'No',
    availableFrom: new Date('2021-08-02').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    resourceType: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    resourceType: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    resourceType: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    resourceType: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    resourceType: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  }
];

const actions: Actions = [{ label: 'Borrow', onClick: (id: number) => {} }];

const ResourcesProvider: React.FC = ({ children }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [order, setOrder] = useState<SortDirection>('asc');
  const [orderBy, setOrderBy] = useState<keyof ResourceData>('title');

  const onRequestSort = useCallback(
    (property: keyof ResourceData) => {
      const isAsc = orderBy === property && order === 'asc';

      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const value: ResourcesState = {
    titleFilter,
    typeFilter,
    availabilityFilter,
    fields,
    headDetails,
    items,
    actions,
    order,
    orderBy,

    setTitleFilter,
    setTypeFilter,
    setAvailabilityFilter,
    onRequestSort
  };

  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
};

export default ResourcesProvider;
