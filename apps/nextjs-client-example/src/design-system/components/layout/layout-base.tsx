import React from 'react';
import { layoutClient } from '@kuda-terbang/ui-mui-react-example';
import type { LayoutType } from '@kuda-terbang/ui-mui-react-example';
import { getDeepValue } from '@kuda-terbang/util-react-common';

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
    const LayoutComponent = getDeepValue(layoutClient, layoutType);
    return (
      <LayoutComponent
        footerMenus={footerMenus}
        navbarMenus={navbarMenus}
        settingMenus={settingMenus}
        isAuthenticated={isAuthenticated}
      >
        {children}
      </LayoutComponent>
    );
  }
  const LayoutComponent = getDeepValue(layoutClient, layoutType);
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default LayoutBase;
