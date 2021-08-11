import React, { useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LoanTableData } from '~app/contexts';
import { useLoans } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader } from '~app/components';

const fields: Array<keyof LoanTableData> = ['title', 'ebook', 'available', 'dueDate'];

const LoansTable = (): JSX.Element => {
  const { loans, loading, error, returnMaterial } = useLoans();
  const { t } = useTranslation();

  const headDetails: DataTabelProps<LoanTableData>['headDetails'] = {
    title: {
      label: t('general:title'),
      width: '40%'
    },
    ebook: {
      label: t('general:materialType')
    },
    available: {
      label: t('general:available')
    },
    dueDate: {
      label: t('material:dueDate')
    }
  };

  const items = loans.map((loan) => ({
    title: loan.title,
    ebook: loan.ebook ? t('general:eBook') : t('general:book'),
    available: loan.available ? t('general:yes') : t('general:no'),
    dueDate: loan.dueDate
  }));

  const onRequestReturn = useCallback(
    (index: number) => {
      const { title, createdDate, ebook } = loans[index];

      returnMaterial({
        variables: {
          input: {
            title,
            createdDate,
            ebook,
            available: true
          }
        }
      });
    },
    [returnMaterial, loans]
  );

  return (
    <Box>
      <DataTabel
        fields={fields}
        headDetails={headDetails}
        items={items}
        actions={[{ label: t('material:return'), onClick: onRequestReturn }]}
      />

      <Box padding="1rem">
        {loading && <Loader />}

        {!loading && error && <Typography>{t('material:loadLoansError')}</Typography>}

        {!loading && !error && loans.length === 0 && (
          <Typography>{t('material:noLoans')}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoansTable;
