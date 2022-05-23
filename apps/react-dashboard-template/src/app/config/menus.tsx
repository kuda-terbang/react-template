import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import TableChartIcon from '@mui/icons-material/TableChart';

interface Menu {
  Icon: typeof HomeIcon,
  name: string,
  route: string,
  isDivider?: boolean,
  isProtected?: boolean
}
export const menus: Menu[] = [
  {
    Icon: HomeIcon,
    name: 'Home',
    route: '/'
  },
  {
    Icon: TableChartIcon,
    isDivider: true,
    isProtected: true,
    name: 'Table',
    route: '/table'
  },
  {
    Icon: ListIcon,
    isProtected: true,
    name: 'Todo',
    route: '/todo',
  }
]