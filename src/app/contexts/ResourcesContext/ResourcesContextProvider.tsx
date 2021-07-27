import React, { useState, useCallback, useMemo } from 'react';
import { SortDirection } from '@material-ui/core';

import {
  ResourcesContext,
  ResourcesState,
  TypeFilter,
  AvailabilityFilter,
  ResourceData
} from './ResourcesContext';
import {
  stableSort,
  getComparator,
  dateComparator,
  generalDescendingComparator
} from '~app/helpers';

const mockData: ResourceData[] = [
  {
    title: 'Test Title',
    type: 'book',
    availability: 'Yes',
    availableFrom: new Date().toDateString()
  },
  {
    title: 'Lorem ipsum',
    type: 'eBook',
    availability: 'No',
    availableFrom: new Date('2021-08-02').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    type: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    type: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    type: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: 'Lorem ipsum2',
    type: 'book',
    availability: 'No',
    availableFrom: new Date('2021-08-01').toDateString()
  },
  {
    title: '論語',
    type: 'book',
    availability: 'Yes',
    availableFrom: new Date('2021-08-01').toDateString()
  }
];

const filterByTitle = (resources: ResourceData[], filter: string): ResourceData[] => {
  return resources.filter((resource) =>
    resource.title.toLowerCase().includes(filter.toLowerCase())
  );
};

const filterByType = (resources: ResourceData[], filter: TypeFilter): ResourceData[] => {
  if (filter === 'all') return resources;

  return resources.filter((resource) => resource.type === filter);
};

const filterByAvailabilityFilter = (
  resources: ResourceData[],
  filter: AvailabilityFilter
): ResourceData[] => {
  if (filter === 'all') return resources;

  return resources.filter((resource) => resource.availability.toLowerCase() === filter);
};

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

  const items = useMemo(() => {
    let results = filterByTitle(mockData, titleFilter);
    results = filterByType(results, typeFilter);
    results = filterByAvailabilityFilter(results, availabilityFilter);

    const comparator = orderBy === 'availableFrom' ? dateComparator : generalDescendingComparator;

    return stableSort(results, getComparator(order, orderBy, comparator));
  }, [titleFilter, typeFilter, availabilityFilter, order, orderBy]);

  const onRequestBorrow = useCallback(
    (id: number) => {
      const data = items[id];
      console.log('onRequestBorrow', data);
    },
    [items]
  );

  const value: ResourcesState = {
    titleFilter,
    typeFilter,
    availabilityFilter,
    items,
    order,
    orderBy,

    setTitleFilter,
    setTypeFilter,
    setAvailabilityFilter,
    onRequestSort,
    onRequestBorrow
  };

  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
};

export default ResourcesProvider;
