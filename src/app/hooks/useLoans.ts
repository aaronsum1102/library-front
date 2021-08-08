import { useContext } from 'react';
import { LoansContext, LoansState } from '~app/contexts';

const useLoans = (): LoansState => {
  const result = useContext(LoansContext);

  if (!result) {
    throw new Error('Loans context provider is not found');
  }

  return result;
};

export default useLoans;
