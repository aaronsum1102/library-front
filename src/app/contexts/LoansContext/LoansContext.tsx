import { createContext } from 'react';

import {
  LoansQueryHookResult,
  LoanResource,
  ReturnMaterialMutationHookResult
} from '~app/apollo/generated/graphql';

type Loan = Pick<LoanResource, 'title' | 'createdDate' | 'ebook' | 'available' | 'dateBorrowed'>;

interface LoanData extends Loan {
  dueDate: string;
}

export type LoanTableData = Pick<LoanData, 'title' | 'ebook' | 'available' | 'dueDate'>;

type ReturnMaterialAction = ReturnMaterialMutationHookResult[0];

export interface LoansState {
  loans: LoanData[];
  loading: LoansQueryHookResult['loading'];
  error: LoansQueryHookResult['error'];
  returnMaterial: ReturnMaterialAction;
}

export const LoansContext = createContext<LoansState | null>(null);
