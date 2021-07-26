import React from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  SortDirection,
  styled
} from '@material-ui/core';
import { ActionMenu, ActionMenuProps } from './ActionMenu';

interface HeadDetails {
  label: string;
  sortable?: boolean;
  alignRight?: boolean;
  width?: number | string;
}

interface HeadCellProps<T> extends HeadDetails {
  id: string;
  order?: SortDirection;
  orderBy?: keyof T;
  onRequestSort?: (property: keyof T) => void;
}

export interface DataTabelProps<T> {
  headDetails: Record<keyof T, HeadDetails>;
  fields: Array<keyof T>;
  items: T[];
  order?: SortDirection;
  orderBy?: keyof T;
  actions?: ActionMenuProps['actions'];
  onRequestSort?: (property: keyof T) => void;
}

const HeadCell = <T,>({
  id,
  label,
  sortable,
  alignRight,
  width,
  order,
  orderBy,
  onRequestSort
}: HeadCellProps<T>): JSX.Element => {
  return (
    <TableCell
      key={label}
      align={alignRight ? 'right' : 'left'}
      width={width}
      sortDirection={orderBy === id ? order : false}
    >
      {sortable ? (
        <TableSortLabel
          active={orderBy === id}
          direction={orderBy === id && order ? order : 'asc'}
          onClick={() => onRequestSort && onRequestSort(id as keyof T)}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
};

HeadCell.defaultProps = {
  sortable: false,
  alignRight: false,
  width: undefined,
  order: undefined,
  orderBy: undefined,
  onRequestSort: undefined
};

const Container = styled(Box)({
  overflowX: 'scroll'
});

export const DataTabel = <T,>({
  headDetails,
  fields,
  items,
  order,
  orderBy,
  actions,
  onRequestSort
}: DataTabelProps<T>): JSX.Element => {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <HeadCell
                key={field as string}
                id={field as string}
                order={order}
                orderBy={orderBy}
                {...headDetails[field as keyof T]}
                onRequestSort={onRequestSort}
              />
            ))}
            <TableCell align="right" width={56}>
              {null}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index} hover>
              {fields.map((field) => (
                <TableCell key={field as string}>{item[field as keyof T]}</TableCell>
              ))}
              <TableCell>
                {actions && actions.length > 0 && <ActionMenu id={index} actions={actions} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
