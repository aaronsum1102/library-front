import { SortDirection } from '@material-ui/core';

type Compartor = <T>(a: T, b: T, orderBy: keyof T) => 1 | -1 | 0;

export const generalDescendingComparator: Compartor = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const dateComparator: Compartor = (a, b, orderBy) => {
  const firstData = new Date(a[orderBy] as any).getTime();
  const nextData = new Date(b[orderBy] as any).getTime();

  if (nextData < firstData) {
    return -1;
  }
  if (nextData > firstData) {
    return 1;
  }
  return 0;
};

export const getComparator = <T>(
  sortDirection: SortDirection,
  orderBy: keyof T,
  comparator: Compartor
): ((a: T, b: T) => number) => {
  return sortDirection === 'desc'
    ? (a, b) => comparator<T>(a, b, orderBy)
    : (a, b) => -comparator<T>(a, b, orderBy);
};

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};
