import React, { createContext, useState } from 'react';
import { styled } from '@mui/material/styles';

import Footer from './footer';
import type { FooterProps } from './footer';
import Navbar from './navbar';
import type { NavbarProps } from './navbar';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  footerMenus: FooterProps['footerMenus'];
  navbarMenus: NavbarProps['menus'];
  settingMenus: NavbarProps['settingMenus'];
  isAuthenticated?: boolean;
  version?: string;
};

const Main = styled('div')`
  min-height: 100vh;
`;

export const LayoutBasicContext = createContext<{
  title: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}>({
  title: '',
});

const LayoutDefault = ({
  children,
  footerMenus,
  version,
  navbarMenus,
  settingMenus,
  isAuthenticated,
}: Props) => {
  const [title, setTitle] = useState('');

  return (
    <LayoutBasicContext.Provider value={{ title, setTitle }}>
      <Navbar
        isAuthenticated={isAuthenticated}
        title={title}
        menus={navbarMenus}
        settingMenus={settingMenus}
      />
      <Main>{children}</Main>
      <Footer version={version} footerMenus={footerMenus} />
    </LayoutBasicContext.Provider>
  );
};

export default LayoutDefault;
