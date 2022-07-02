import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MuiTableRow from '@mui/material/TableRow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TableCell from '@mui/material/TableCell'
import { ReactPortal } from 'react'

import { HeadCell } from './table-head'

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

export type TableRowProps<TData> = {
  columnKey: keyof TData
  data: TData
  headOptions: HeadCell<TData>[]
  isItemSelected?: boolean
  labelId: string
  onClick: (event: React.MouseEvent<unknown>, name: never) => void
  rowRenderOption?: PartialRecord<
    keyof Partial<TData>,
    React.ComponentType<TData>
  >
  // rowRenderOption?: {
  //   [P in keyof TData]?: React.ComponentType<TData>
  // }
  rowActionOptions: {
    label: string
    onClick: (labelId: TData[keyof TData]) => void
  }[]
  withCheckbox: boolean
}

function TableRow<TData>({
  columnKey,
  data,
  headOptions,
  isItemSelected,
  labelId,
  onClick,
  rowActionOptions,
  rowRenderOption,
  withCheckbox,
}: TableRowProps<TData>): JSX.Element {
  const handleClickRow = (event: React.MouseEvent<unknown>) =>
    onClick(event, data[columnKey] as never)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (e?: any) => {
    e?.stopPropagation?.()
    setAnchorEl(null)
  }
  return (
    <MuiTableRow
      hover
      onClick={handleClickRow}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={data[columnKey] as unknown as React.Key}
      selected={isItemSelected}
    >
      {withCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
      )}
      {headOptions.map(({ id }, index) => {
        const propsId =
          index === 0
            ? {
                id: labelId,
                scope: 'row',
              }
            : {}

        let CustomRow
        if (rowRenderOption) {
          CustomRow = rowRenderOption[id]
        }

        return (
          <TableCell key={`${data[id]}-${index}`} {...propsId}>
            {CustomRow ? (
              <CustomRow
                {...(data as JSX.IntrinsicAttributes &
                  JSX.LibraryManagedAttributes<
                    Record<
                      keyof TData,
                      React.ComponentType<TData>
                    >[keyof TData],
                    TData
                  >)}
              />
            ) : (
              (data[id] as unknown as ReactPortal)
            )}
          </TableCell>
        )
      })}
      {rowActionOptions.length > 0 && (
        <TableCell sx={{ zIndex: 100000 }}>
          <IconButton
            color="inherit"
            aria-label="open menu row"
            onClick={handleClick}
            edge="start"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="row-action-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {rowActionOptions.map((rowAction, index) => {
              const handleClickMenu = () => {
                handleClose()
                rowAction.onClick(data[columnKey])
              }
              return (
                <MenuItem
                  key={`${rowAction.label}-${index}`}
                  onClick={handleClickMenu}
                >
                  {rowAction.label}
                </MenuItem>
              )
            })}
          </Menu>
        </TableCell>
      )}
    </MuiTableRow>
  )
}

export default TableRow
