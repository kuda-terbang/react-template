import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'design-system';
import { useAuth } from '../../utils/auth-strapi';

import logo from '../../assets/img/logo.svg';
import { menus } from '../config/menus';

const useElementBuilder = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
  options?: {
    isProtected: boolean;
  }
) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (options?.isProtected && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <React.Suspense fallback={<>...</>}>
      <Component />
    </React.Suspense>
  );
};

const Home = React.lazy(() => import('../pages/home'));
const Common = React.lazy(() => import('../../features/common/pages'));

const RootRoutes = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutDashboard
            logo={logo}
            menus={menus}
            logout={logout}
            isAuthenticated={isAuthenticated}
            username={user?.username}
          />
        }
      >
        <Route index element={useElementBuilder(Home)} />
        <Route path="*" element={<>No page</>} />
        <Route
          path="/common"
          element={useElementBuilder(Common, { isProtected: true })}
        />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
