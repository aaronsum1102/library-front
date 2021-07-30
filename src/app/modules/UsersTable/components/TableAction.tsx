import React from 'react';
import { Grid } from '@material-ui/core';

import { Dropdown, DropdownProps, SearchField } from '~app/components';

interface TableActionProps {
  value: string;
  userTypeOptions: DropdownProps<boolean | null>['options'];
  userTypeFilter: DropdownProps<boolean | null>['value'];
  onValueChange: (value: string) => void;
  onUserTypeFilterChange: (value: boolean | null) => void;
}

const TableAction = ({
  value,
  userTypeOptions,
  userTypeFilter,
  onValueChange,
  onUserTypeFilterChange
}: TableActionProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <SearchField
          label="Search user"
          value={value}
          onChange={onValueChange}
          helperText="Search user by email or name"
        />
      </Grid>

      <Grid item xs={6} sm={3} lg={2}>
        <Dropdown
          id="user-type-filter"
          label="User type"
          options={userTypeOptions}
          value={userTypeFilter}
          onChange={(newValue) => onUserTypeFilterChange(newValue)}
        />
      </Grid>
    </Grid>
  );
};

export default TableAction;
