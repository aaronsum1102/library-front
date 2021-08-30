import React, { useState, useCallback, useMemo } from 'react';
import { SortDirection } from '@material-ui/core';

import { useResourcesQuery } from '~app/apollo/generated/graphql';
import {
  ResourcesContext,
  ResourcesState,
  TypeFilter,
  AvailabilityFilter,
  Resource,
  ResourceTableData
} from './ResourcesContext';
import {
  stableSort,
  getComparator,
  dateComparator,
  generalDescendingComparator,
  formatDate
} from '~app/helpers';

const filterByTitle = (resources: Resource[], filter: string): Resource[] => {
  return resources.filter((resource) =>
    resource.title.toLowerCase().includes(filter.toLowerCase())
  );
};

const filterByType = (resources: Resource[], filter: TypeFilter): Resource[] => {
  if (filter === null) return resources;

  return resources.filter((resource) => resource.ebook === filter);
};

const filterByAvailabilityFilter = (
  resources: Resource[],
  filter: AvailabilityFilter
): Resource[] => {
  if (filter === null) return resources;

  return resources.filter((resource) => resource.available === filter);
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

    const items: Resource[] = resourcesData.resources.map((data) => ({
      ...data,
      dueDate: data.dueDate
        ? formatDate(new Date(data.dueDate), localStorage.getItem('userLanguage') ?? 'en')
        : '-',
      borrowerName: data.borrower?.name ?? '-',
      borrowerPhoneNumber: data.borrower?.phoneNumber ?? '-'
    }));

    let results = filterByTitle(items, titleFilter);
    results = filterByType(results, typeFilter);
    results = filterByAvailabilityFilter(results, availabilityFilter);

    const comparator = orderBy === 'dueDate' ? dateComparator : generalDescendingComparator;

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
