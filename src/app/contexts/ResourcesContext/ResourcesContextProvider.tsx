import React, { useState, useCallback, useMemo } from 'react';
import { SortDirection } from '@material-ui/core';

import { useResourcesQuery } from '~app/apollo/generated/graphql';
import {
  ResourcesContext,
  ResourcesState,
  TypeFilter,
  AvailabilityFilter,
  ResourceData,
  ResourceTableData
} from './ResourcesContext';
import {
  stableSort,
  getComparator,
  dateComparator,
  generalDescendingComparator
} from '~app/helpers';

const filterByTitle = (resources: ResourceData[], filter: string): ResourceData[] => {
  return resources.filter((resource) =>
    resource.title.toLowerCase().includes(filter.toLowerCase())
  );
};

const filterByType = (resources: ResourceData[], filter: TypeFilter): ResourceData[] => {
  if (filter === null) return resources;

  return resources.filter((resource) => resource.ebook === filter);
};

const filterByAvailabilityFilter = (
  resources: ResourceData[],
  filter: AvailabilityFilter
): ResourceData[] => {
  if (filter === null) return resources;

  return resources.filter((resource) => resource.available === filter);
};

const addDays = (date: string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

const ResourcesProvider: React.FC = ({ children }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>(null);
  const [order, setOrder] = useState<SortDirection>('asc');
  const [orderBy, setOrderBy] = useState<keyof ResourceTableData>('title');

  const { data: resourcesData, loading, error, refetch: refetchResources } = useResourcesQuery();

  const onRequestSort = useCallback(
    (property: keyof ResourceTableData) => {
      const isAsc = orderBy === property && order === 'asc';

      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const resources = useMemo(() => {
    if (!resourcesData) return [];

    const items = resourcesData.resources.map((data) => ({
      ...data,
      availableFrom: data.dateBorrowed
        ? addDays(data.dateBorrowed, 10).toISOString()
        : new Date().toISOString()
    }));

    let results = filterByTitle(items, titleFilter);
    results = filterByType(results, typeFilter);
    results = filterByAvailabilityFilter(results, availabilityFilter);

    const comparator = orderBy === 'availableFrom' ? dateComparator : generalDescendingComparator;

    return stableSort(results, getComparator(order, orderBy, comparator));
  }, [resourcesData, titleFilter, typeFilter, availabilityFilter, order, orderBy]);

  const value: ResourcesState = {
    titleFilter,
    typeFilter,
    availabilityFilter,
    loading,
    error,
    resources,
    order,
    orderBy,

    setTitleFilter,
    setTypeFilter,
    setAvailabilityFilter,
    onRequestSort,
    refetchResources
  };

  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
};

export default ResourcesProvider;
