import { createAuthentication } from '@kudaterbang/util-auth';

import apiStrapi, { strapiTokenKey } from '@kudaterbang/data-access-strapi';
import { useRouter } from 'next/router';

const { AuthContext, AuthProvider, useAuth, withProtectedSsr } =
  createAuthentication(
    {
      tokenKey: strapiTokenKey,
      fetchUser: apiStrapi.meGet,
    },
    'ssr'
  );

const AuthProviderApp = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <AuthProvider
      navigateLogout={() => {
        router.push('/');
      }}
    >
      {children}
    </AuthProvider>
  );
};

export { AuthContext, AuthProviderApp, useAuth, withProtectedSsr };
