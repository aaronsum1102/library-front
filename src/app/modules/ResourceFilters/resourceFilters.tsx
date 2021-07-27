import React from 'react';
import { Box } from '@material-ui/core';

import { TypeFilter, AvailabilityFilter } from '~app/contexts';
import { useResources } from '~app/hooks';
import { Orientations, Spacer, Spacings, Dropdown } from '~app/components';
import SearchFilter from './components';

interface Option<T> {
  label: string;
  value: T;
}

const typeOptions: Option<TypeFilter>[] = [
  { label: 'All', value: 'all' },
  { label: 'Book', value: 'book' },
  { label: 'eBook', value: 'eBook' }
];

const availabilityOptions: Option<AvailabilityFilter>[] = [
  { label: 'All', value: 'all' },
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const ResourceFilters = (): JSX.Element => {
  const {
    titleFilter,
    typeFilter,
    availabilityFilter,
    setTitleFilter,
    setTypeFilter,
    setAvailabilityFilter
  } = useResources();

  return (
    <Box display="flex" flexWrap="wrap">
      <SearchFilter value={titleFilter} onChange={setTitleFilter} />
      <Spacer space={Spacings.xLarge} orientation={Orientations.vertical} />
      <Dropdown
        id="resource-type-filter"
        label="Resource type"
        options={typeOptions}
        value={typeFilter}
        onChange={(value) => setTypeFilter(value as TypeFilter)}
      />
      <Spacer space={Spacings.xLarge} orientation={Orientations.vertical} />
      <Dropdown
        id="availability-filter"
        label="Availability"
        options={availabilityOptions}
        value={availabilityFilter}
        onChange={(value) => setAvailabilityFilter(value as AvailabilityFilter)}
      />
    </Box>
  );
};

export default ResourceFilters;
