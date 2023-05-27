import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface EnhancedTableHeadProps<TData> {
  numSelected: number;
  headOptions: HeadCell<TData>[]
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  withActionColumn: boolean;
  withCheckbox: boolean;
}

export interface HeadCell<TData> {
  id: keyof TData;
  label: string;
}

function EnhancedTableHead<TData>(props: EnhancedTableHeadProps<TData>) {
  const {
    onSelectAllClick,
    headOptions,
    numSelected,
    rowCount,
    withCheckbox,
    withActionColumn,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {withCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headOptions.map((headCell) => (
          <TableCell key={headCell.id as React.Key}>
            {headCell.label}
          </TableCell>
        ))}
        {withActionColumn && (
          <TableCell>
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead
