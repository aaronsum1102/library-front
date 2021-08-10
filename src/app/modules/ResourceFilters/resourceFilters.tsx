import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TypeFilter, AvailabilityFilter } from '~app/contexts';
import { useResources } from '~app/hooks';
import { Dropdown, SearchField } from '~app/components';

interface Option<T> {
  label: string;
  value: T;
}

const ResourceFilters = (): JSX.Element => {
  const {
    titleFilter,
    typeFilter,
    availabilityFilter,
    setTitleFilter,
    setTypeFilter,
    setAvailabilityFilter
  } = useResources();
  const { t } = useTranslation();

  const typeOptions: Option<TypeFilter>[] = [
    { label: t('general:all'), value: null },
    { label: t('general:book'), value: false },
    { label: t('general:eBook'), value: true }
  ];

  const availabilityOptions: Option<AvailabilityFilter>[] = [
    { label: t('general:all'), value: null },
    { label: t('general:yes'), value: true },
    { label: t('general:no'), value: false }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <SearchField
          id="resource-filter"
          label={t('material:searchMaterial')}
          value={titleFilter}
          onChange={setTitleFilter}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="resource-type-filter"
          label={t('general:materialType')}
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => setTypeFilter(value as TypeFilter)}
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="available-filter"
          label={t('general:available')}
          options={availabilityOptions}
          value={availabilityFilter}
          onChange={(value) => setAvailabilityFilter(value as AvailabilityFilter)}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceFilters;
