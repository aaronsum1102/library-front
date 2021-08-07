import React, { useMemo } from 'react';

import { useLoansQuery } from '~app/apollo/generated/graphql';
import { useAuth } from '~app/hooks';
import { addDays, formatDate, stableSort, getComparator, dateComparator } from '~app/helpers';
import { LoansContext } from './LoansContext';

const LoansProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const { data, loading, error, refetch } = useLoansQuery({
    variables: {
      borrowerId: user!.uid
    },
    skip: !user
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
    <LoansContext.Provider value={{ loans, loading, error }}>{children}</LoansContext.Provider>
  );
};

export default LoansProvider;
