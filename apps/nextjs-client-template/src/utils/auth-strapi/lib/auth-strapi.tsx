import * as Sentry from '@sentry/nextjs';
import { createAuthentication } from '~/utils/util-auth';

import apiStrapi, { strapiTokenKey } from '~/services/data-access-strapi';
import { useRouter } from 'next/router';

const { AuthContext, AuthProvider, useAuth, withProtectedSsr } = createAuthentication(
  {
    tokenKey: strapiTokenKey,
    fetchUser: apiStrapi.meGet,
    onFetchUserSuccess: (user) => {
      Sentry.setUser({
        email: user?.email,
      });
    },
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
