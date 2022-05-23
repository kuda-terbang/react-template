import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import type { LinkProps } from '@mui/material/Link';
import type { CSSInterpolation } from '@mui/material';

import Link from './Link'

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      } as LinkProps,
      styleOverrides: {
        root: {
          textDecoration: 'none',
        } as CSSInterpolation
      }
    },
    MuiListItemButton: {
      defaultProps: {
        LinkComponent: Link,
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;