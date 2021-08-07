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
  { label: 'All', value: null },
  { label: 'Book', value: false },
  { label: 'eBook', value: true }
];

const availabilityOptions: Option<AvailabilityFilter>[] = [
  { label: 'All', value: null },
  { label: 'Yes', value: true },
  { label: 'No', value: false }
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
          label="Search material"
          value={titleFilter}
          onChange={setTitleFilter}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="resource-type-filter"
          label="Material type"
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => setTypeFilter(value as TypeFilter)}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="available-filter"
          label="Available"
          options={availabilityOptions}
          value={availabilityFilter}
          onChange={(value) => setAvailabilityFilter(value as AvailabilityFilter)}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceFilters;
