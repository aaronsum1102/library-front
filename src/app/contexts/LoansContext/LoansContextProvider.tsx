import React, { useMemo } from 'react';

import { useLoansQuery, useReturnMaterialMutation } from '~app/apollo/generated/graphql';
import { useAuth, useSnackbar } from '~app/hooks';
import { addDays, formatDate, stableSort, getComparator, dateComparator } from '~app/helpers';
import { LoansContext } from './LoansContext';

const LoansProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { addSnackbar } = useSnackbar();

  const { data, loading, error, refetch } = useLoansQuery({
    variables: {
      borrowerId: user!.uid
    },
    skip: !user
  });

  const [returnMaterial] = useReturnMaterialMutation({
    onCompleted() {
      addSnackbar({
        content: 'Material has been returned.'
      });

      refetch();
    },
    onError() {
      addSnackbar({
        content: 'Failed to return material. Please try again later.',
        error: true
      });
    }
  });

  const loans = useMemo(() => {
    if (!data) return [];

    const items = data.loans.map((loanData) => {
      return {
        ...loanData,
        dueDate: formatDate(addDays(loanData.dateBorrowed, 10), navigator.language)
      };
    });

    return stableSort(items, getComparator('asc', 'dueDate', dateComparator));
  }, [data]);

  return (
    <LoansContext.Provider value={{ loans, loading, error, returnMaterial }}>
      {children}
    </LoansContext.Provider>
  );
};

export default LoansProvider;
