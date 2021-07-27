import React from 'react';

import { useResources } from '~app/hooks';
import { DataTabel } from '~app/components';
import {
  stableSort,
  getComparator,
  dateComparator,
  generalDescendingComparator
} from '~app/helpers';

const ResourcesTable = () => {
  const { fields, headDetails, items, actions, order, orderBy, onRequestSort } = useResources();

  const comparator = orderBy === 'availableFrom' ? dateComparator : generalDescendingComparator;

  return (
    <DataTabel
      fields={fields}
      headDetails={headDetails}
      items={stableSort(items, getComparator(order, orderBy, comparator))}
      actions={actions}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
    />
  );
};

export default ResourcesTable;
