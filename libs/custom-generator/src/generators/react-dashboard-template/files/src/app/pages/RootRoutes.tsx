import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import LayoutDashboard from '../../design-system/components/layout/layout-dashboard-csr';
import { useAuth, useProtectedRoutes } from '../../utils/auth-strapi';

import { websiteName } from '../../config/envValue'
import logo from '../../assets/img/logo.svg'
import { menus } from '../config/menus'

const Home = React.lazy(() => import('../pages/home'))
const Common = React.lazy(() => import('../../features/common/pages'));

const RootRoutes = () => {
  const { isAuthenticated, logout, user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={(
        <LayoutDashboard
          logo={logo}
          menus={menus}
          logout={logout}
          isAuthenticated={isAuthenticated}
          username={user?.username}
          websiteName={websiteName}
        />
      )}>
        <Route index element={useProtectedRoutes(Home)} />
        <Route path="*" element={<>No page</>} />
        <Route path="/common" element={useProtectedRoutes(Common, { isProtected: true })} />
      </Route>
    </Routes>
  )
}

export default RootRoutes