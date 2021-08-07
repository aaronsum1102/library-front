import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { LoanTableData } from '~app/contexts';
import { useLoans } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader } from '~app/components';

const fields: Array<keyof LoanTableData> = ['title', 'ebook', 'available', 'dueDate'];

const headDetails: DataTabelProps<LoanTableData>['headDetails'] = {
  title: {
    label: 'Title',
    width: '40%'
  },
  ebook: {
    label: 'Material type'
  },
  available: {
    label: 'Availability'
  },
  dueDate: {
    label: 'Due date'
  }
};

const LoansTable = (): JSX.Element => {
  const { loans, loading, error } = useLoans();

  const items = loans.map((loan) => ({
    title: loan.title,
    ebook: loan.ebook ? 'eBook' : 'book',
    available: loan.available ? 'Yes' : 'No',
    dueDate: loan.dueDate
  }));

  return (
    <Box>
      <DataTabel fields={fields} headDetails={headDetails} items={items} />

      <Box padding="1rem">
        {loading && <Loader />}

        {!loading && error && (
          <Typography>Failed to load loan materials. Please try again later.</Typography>
        )}

        {!loading && !error && loans.length === 0 && (
          <Typography>No loan materials availiable</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoansTable;
