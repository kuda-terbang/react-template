import type { NavbarProps } from '@kudaterbang/ui-mui-react-example';
import { useAuth } from '../src/utils/auth-strapi';

export const navbarMenus: NavbarProps['menus'] = [
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Protected SSR',
    link: '/protected-ssr',
    isProtected: true,
  },
];

export const footerMenus = [
  {
    title: 'About',
    menus: [{ title: 'About Us', link: '/about' }],
  },
  {
    title: 'SSR',
    menus: [{ title: 'Protected', link: '/protected-ssr' }],
  },
];

export const useSettingMenus = () => {
  const { logout } = useAuth();
  return [
    {
      title: 'About',
      link: '/about',
    },
    {
      title: 'Protected SSR',
      link: '/protected-ssr',
      isProtected: true,
    },
    {
      title: 'Logout',
      isProtected: true,
      onClick: () => {
        logout();
      },
    },
  ];
};
