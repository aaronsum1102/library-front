import React, { ReactNode, Fragment } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  SortDirection
} from '@material-ui/core';
import { ActionMenu, ActionMenuProps } from './components/actionMenu';

interface HeadLabel {
  id: string;
  label: string | ReactNode;
  sortable?: boolean;
  sortDirection?: SortDirection;
  alignRight?: boolean;
  width?: number | string;
}

interface RowData {
  id: string;
  title: string;
  resourceType: string;
  availableFrom: string;
}

const headLabels: HeadLabel[] = [
  {
    id: 'title',
    label: 'Title',
    sortable: true,
    width: '40%'
  },
  { id: 'resourceType', label: 'Resource type' },
  { id: 'availability', label: 'Availability' },
  { id: 'availableFrom', label: 'Available from', sortable: true },
  { id: 'actions', label: '', alignRight: true, width: 50 }
];

const actions: ActionMenuProps['actions'] = [{ label: 'Borrow', onClick: (id: string) => {} }];

const rows: RowData[] = [
  {
    id: '12343',
    title: 'Test Title',
    resourceType: 'book',
    availableFrom: '2021-07-02T10:30:10.000'
  }
];

const ResourceTable = (): JSX.Element => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headLabels.map((data) => (
            <TableCell
              key={data.id}
              align={data.alignRight ? 'right' : 'left'}
              sortDirection={data.sortDirection}
              width={data.width}
            >
              {data.sortable ? <TableSortLabel>{data.label}</TableSortLabel> : data.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow hover>
          {rows.map((data) => (
            <Fragment key={data.id}>
              {Object.keys(data).map((key) => (
                <TableCell key={key}>{data[key as keyof RowData]}</TableCell>
              ))}
              <TableCell>
                <ActionMenu id="test" actions={actions} />
              </TableCell>
            </Fragment>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ResourceTable;
