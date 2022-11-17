import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { createAuthentication } from 'utils/util-auth';
import apiStrapi, { strapiTokenKey } from 'services/data-access-strapi';

const { AuthContext, AuthProvider, useAuth } = createAuthentication(
  {
    tokenKey: strapiTokenKey,
    fetchUser: apiStrapi.meGet,
  },
  'csr'
);

const AuthProviderApp = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <AuthProvider
      navigateLogout={() => {
        navigate('/');
      }}
    >
      {children}
    </AuthProvider>
  );
};

const useProtectedRoutes = (
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

export { AuthContext, AuthProviderApp, useAuth, useProtectedRoutes };
