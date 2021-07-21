import React from 'react';

import { Dropdown, DropdownProps } from '~app/components';

type ResourceTypeFilterProps = Omit<DropdownProps, 'id' | 'label'>;

const ResourceTypeFilter = (props: ResourceTypeFilterProps): JSX.Element => {
  return <Dropdown id="resource-type-filter" label="Resource type" {...props} />;
};

export default ResourceTypeFilter;
