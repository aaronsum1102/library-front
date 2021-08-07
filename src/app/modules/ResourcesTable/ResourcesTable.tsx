import React from 'react';
import { Box, Typography, styled } from '@material-ui/core';

import { ResourceTableData } from '~app/contexts';
import { useResources } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader } from '~app/components';

const StyledParagraph = styled(Typography)({
  padding: '1rem'
});

const fields: Array<keyof ResourceTableData> = ['title', 'ebook', 'available', 'availableFrom'];

const headDetails: DataTabelProps<ResourceTableData>['headDetails'] = {
  title: {
    label: 'Title',
    sortable: true,
    width: '40%'
  },
  ebook: {
    label: 'Resource type'
  },
  available: {
    label: 'Availability'
  },
  availableFrom: {
    label: 'Available from',
    sortable: true
  }
};

const borrowActionLabel = 'Borrow';

const ResourcesTable = (): JSX.Element => {
  const { resources, loading, error, order, orderBy, onRequestSort, onRequestBorrow } =
    useResources();

  const actions = [{ label: borrowActionLabel, onClick: onRequestBorrow }];

  const items = resources.map(
    (item) => ({
      title: item.title,
      ebook: item.ebook ? 'eBook' : 'book',
      available: item.available ? 'Yes' : 'No',
      availableFrom: item.availableFrom
    }),
    []
  );

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

      <Box padding="1rem">
        {loading && <Loader />}

        {!loading && error && (
          <Typography>Failed to load resources. Please try again later.</Typography>
        )}

        {!loading && !error && items.length === 0 && (
          <StyledParagraph>No resources availiable</StyledParagraph>
        )}
      </Box>
    </Box>
  );
};

export default ResourcesTable;
