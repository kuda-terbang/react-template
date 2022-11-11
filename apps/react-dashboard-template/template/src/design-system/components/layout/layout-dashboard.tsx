import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface LogoProps extends React.HTMLProps<HTMLImageElement> {
  isDrawer?: boolean;
  open: boolean;
}

const Logo = styled('img', {
  shouldForwardProp: (props) => props !== 'isDrawer',
})<LogoProps>(({ open, isDrawer, theme }) => {
  const logoSize = {
    height: theme.spacing(5),
    width: theme.spacing(5),
  };
  if (isDrawer) {
    return {
      ...logoSize,
      ...(!open && {
        display: 'none',
      }),
    };
  }
  return {
    ...logoSize,
    marginRight: theme.spacing(3),
    ...(open && {
      display: 'none',
    }),
  };
});
export interface LayoutDashboardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  logo: string;
  logout: () => void;
  username?: string;
  menus: {
    isDivider?: boolean;
    isProtected?: boolean;
    name: string;
    route: string;
    Icon?: typeof MenuIcon;
  }[];
  websiteName?: string;
}
export default function LayoutDashboard({
  children,
  isAuthenticated,
  logo,
  logout,
  username,
  menus,
  websiteName,
}: LayoutDashboardProps) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: theme.spacing(2),
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Logo src={logo} alt="logo-appbar" open={open} />
          <Typography variant="h6" noWrap component="div">
            {websiteName || null}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated && (
            <Typography
              variant="body1"
              noWrap
              component="div"
              sx={{ marginRight: theme.spacing(2) }}
            >
              {username}
            </Typography>
          )}
          {isAuthenticated && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Logout">
                <IconButton
                  size="large"
                  aria-label="logout icon"
                  color="inherit"
                  onClick={() => logout()}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Logo src={logo} alt="logo-appbar" open={open} isDrawer />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map(({ isDivider, isProtected, name, route, Icon }) => {
            if (isProtected && !isAuthenticated) {
              return null;
            }
            const listButton = (
              <ListItemButton key={name} divider={isDivider}>
                {!!Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={name} />
              </ListItemButton>
            );

            return route ? (
              <Link href={route} key={name}>
                {listButton}
              </Link>
            ) : (
              listButton
            );
          })}
          {isAuthenticated && (
            <ListItemButton key="Logout" onClick={() => logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
