import React from 'react';

import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface EnhancedTableToolbarProps<TData> {
  numSelected: number;
  tableTitle: string;
  bulkOptions?: {
    label: string;
    onClick: (selected: unknown[]) => void;
  }[];
  selectedData?: TData[];
}

function TableToolbar<TData>(props: EnhancedTableToolbarProps<TData>): JSX.Element {
  const { bulkOptions = [], numSelected, tableTitle, selectedData = [] } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickButtonMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Button
            variant="contained"
            onClick={handleClickButtonMenu}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Bulk Action
          </Button>
          <Menu
            id="bulk-action-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {bulkOptions.map((option, index) => {
              const handleClickMenu = () => {
                handleClose();
                option.onClick(selectedData);
              };
              return (
                <MenuItem key={`${option.label}-${index}`} onClick={handleClickMenu}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default TableToolbar;
