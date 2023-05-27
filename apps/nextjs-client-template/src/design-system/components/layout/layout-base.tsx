import React from 'react';
import { LayoutBasic, LayoutEmpty } from '~/design-system/index';
import type { LayoutType } from '~/design-system/index';

import { navbarMenus, footerMenus, useSettingMenus } from '../../../../config/menus';
import { useAuth } from '../../../utils/auth-strapi';
type Props = {
  children: React.ReactElement | React.ReactElement[];
  layoutType: LayoutType;
};

const LayoutBase = ({ children, layoutType }: Props) => {
  const { isAuthenticated } = useAuth();
  const settingMenus = useSettingMenus();
  if (layoutType === 'LayoutBasic') {
    return (
      <LayoutBasic
        footerMenus={footerMenus}
        navbarMenus={navbarMenus}
        settingMenus={settingMenus}
        isAuthenticated={isAuthenticated}
      >
        {children}
      </LayoutBasic>
    );
  }
  return <LayoutEmpty>{children}</LayoutEmpty>;
};

export default LayoutBase;
