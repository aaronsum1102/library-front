import React from 'react';
import { Box, Typography, styled } from '@material-ui/core';

import { ResourceData } from '~app/contexts';
import { useResources } from '~app/hooks';
import { DataTabel, DataTabelProps } from '~app/components';

const StyledParagraph = styled(Typography)({
  padding: '1rem'
});

const fields: Array<keyof ResourceData> = ['title', 'type', 'availability', 'availableFrom'];

const headDetails: DataTabelProps<ResourceData>['headDetails'] = {
  title: {
    label: 'Title',
    sortable: true,
    width: '40%'
  },
  type: {
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

const borrowActionLabel = 'Borrow';

const ResourcesTable = (): JSX.Element => {
  const { items, order, orderBy, onRequestSort, onRequestBorrow } = useResources();

  const actions = [{ label: borrowActionLabel, onClick: onRequestBorrow }];

  return (
    <Box>
      <DataTabel
        fields={fields}
        headDetails={headDetails}
        items={items}
        actions={actions}
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      />
      {items.length === 0 && <StyledParagraph>No resources availiable</StyledParagraph>}
    </Box>
  );
};

export default ResourcesTable;
