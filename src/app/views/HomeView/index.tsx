import React, { useState } from 'react';
import { Typography, SortDirection } from '@material-ui/core';

import { Spacer, Spacings, DataTabel, DataTabelProps } from '~app/components';
import { ResourceFilters } from '~app/modules';
import {
  stableSort,
  getComparator,
  dateComparator,
  generalDescendingComparator
} from '~app/helpers';

interface ResourceData {
  title: string;
  resourceType: string;
  availability: string;
  availableFrom: string;
}

const fields: Array<keyof ResourceData> = [
  'title',
  'resourceType',
  'availability',
  'availableFrom'
];

const headDetails: DataTabelProps<ResourceData>['headDetails'] = {
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

const actions: DataTabelProps<ResourceData>['actions'] = [
  { label: 'Borrow', onClick: (id: number) => {} }
];

const HomeView = (): JSX.Element => {
  const [order, setOrder] = useState<SortDirection>('asc');
  const [orderBy, setOrderBy] = useState<keyof ResourceData>('title');

  const onRequestSort = (property: keyof ResourceData) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const comparator = orderBy === 'availableFrom' ? dateComparator : generalDescendingComparator;

  return (
    <>
      <Typography variant="h4">Resources</Typography>
      <Spacer space={Spacings.xLarge} />
      <ResourceFilters />
      <Spacer space={Spacings.xLarge} />
      <DataTabel
        fields={fields}
        headDetails={headDetails}
        items={stableSort(items, getComparator(order, orderBy, comparator))}
        actions={actions}
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      />
      <Spacer space={Spacings.xLarge} />
    </>
  );
};

export default HomeView;
