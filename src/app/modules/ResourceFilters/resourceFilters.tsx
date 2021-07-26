import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { SearchFilter, ResourceTypeFilter } from './components';

const ResourceFilters = (): JSX.Element => {
  const [resourceFilter, setResourceFilter] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Book', value: 'book' },
    { label: 'eBook', value: 'eBook' }
  ];

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      <SearchFilter
        value={resourceFilter}
        onChange={setResourceFilter}
        onClearSearch={() => setResourceFilter('')}
      />
      <ResourceTypeFilter
        options={options}
        value={resourceTypeFilter}
        onChange={(value) => setResourceTypeFilter(value as string)}
      />
      <ResourceTypeFilter
        options={options}
        value={resourceTypeFilter}
        onChange={(value) => setResourceTypeFilter(value as string)}
      />
      <ResourceTypeFilter
        options={options}
        value={resourceTypeFilter}
        onChange={(value) => setResourceTypeFilter(value as string)}
      />
    </Box>
  );
};

export default ResourceFilters;
