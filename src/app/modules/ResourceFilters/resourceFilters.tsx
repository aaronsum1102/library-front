import React from 'react';
import { Grid } from '@material-ui/core';

import { TypeFilter, AvailabilityFilter } from '~app/contexts';
import { useResources } from '~app/hooks';
import { Dropdown, SearchField } from '~app/components';

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <SearchField
          id="resource-filter"
          label="Search resource"
          value={titleFilter}
          onChange={setTitleFilter}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="resource-type-filter"
          label="Resource type"
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => setTypeFilter(value as TypeFilter)}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="availability-filter"
          label="Availability"
          options={availabilityOptions}
          value={availabilityFilter}
          onChange={(value) => setAvailabilityFilter(value as AvailabilityFilter)}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceFilters;
