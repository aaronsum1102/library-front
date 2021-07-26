import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { Orientations, Spacer, Spacings, Dropdown } from '~app/components';
import SearchFilter from './components';

const ResourceFilters = (): JSX.Element => {
  const [resourceFilter, setResourceFilter] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Book', value: 'book' },
    { label: 'eBook', value: 'eBook' }
  ];

  const availabilityOptions = [
    { label: 'All', value: 'all' },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];

  return (
    <Box display="flex" flexWrap="wrap">
      <SearchFilter
        value={resourceFilter}
        onChange={setResourceFilter}
        onClearSearch={() => setResourceFilter('')}
      />
      <Spacer space={Spacings.xLarge} orientation={Orientations.vertical} />
      <Dropdown
        id="resource-type-filter"
        label="Resource type"
        options={options}
        value={resourceTypeFilter}
        onChange={(value) => setResourceTypeFilter(value as string)}
      />
      <Spacer space={Spacings.xLarge} orientation={Orientations.vertical} />
      <Dropdown
        id="availability-filter"
        label="Availability"
        options={availabilityOptions}
        value={availabilityFilter}
        onChange={(value) => setAvailabilityFilter(value as string)}
      />
    </Box>
  );
};

export default ResourceFilters;
