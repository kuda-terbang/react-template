import * as React from 'react';
import type { LinkProps } from '@mui/material/Link';
import type { CSSInterpolation } from '@mui/material';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import type { Theme } from '@mui/material/styles';

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
  );
});

const LinkTheme: Theme['components'] = {
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    } as LinkProps,
    styleOverrides: {
      root: {
        textDecoration: 'none',
      } as CSSInterpolation,
    },
  },
  MuiListItemButton: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
};

export default LinkTheme;
