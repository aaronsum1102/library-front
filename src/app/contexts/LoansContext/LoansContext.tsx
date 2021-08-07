import { createContext } from 'react';

import { LoansQueryHookResult, LoanResource } from '~app/apollo/generated/graphql';

type Loan = Pick<LoanResource, 'title' | 'createdDate' | 'ebook' | 'available' | 'dateBorrowed'>;

interface LoanData extends Loan {
  dueDate: string;
}

export type LoanTableData = Pick<LoanData, 'title' | 'ebook' | 'available' | 'dueDate'>;

export interface LoansState {
  loans: LoanData[];
  loading: LoansQueryHookResult['loading'];
  error: LoansQueryHookResult['error'];
}

export const LoansContext = createContext<LoansState | null>(null);
