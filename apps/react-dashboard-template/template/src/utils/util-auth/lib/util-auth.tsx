/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import useSWR from 'swr';

import { getCookie, setCookie } from './util-cookies';

type TDataUserExtended<TDataUser> = TDataUser;
interface TypeContext<TDataUser> {
  isAuthenticated: boolean;
  logout: () => void;
  login: (val: string) => void;
  user?: TDataUserExtended<TDataUser>;
  setIsAuthenticated: (val: boolean) => void;
}

function createAuthContext<TDataUser>() {
  return createContext<TypeContext<TDataUser>>({
    isAuthenticated: false,
    logout: () => ({}),
    login: () => ({}),
    user: undefined,
    setIsAuthenticated: () => ({}),
  });
}

interface AuthenticationConfig<TDataUser> {
  tokenKey: string;
  fetchUser: () => Promise<AxiosResponse<TDataUserExtended<TDataUser>>>;
}

function createAuthProvider<
  TDataUser,
  TContext extends React.Context<TypeContext<TDataUser>>
>(
  AuthContext: TContext,
  { tokenKey, fetchUser }: AuthenticationConfig<TDataUser>
) {
  return ({
    children,
    navigateLogout,
  }: {
    children: React.ReactNode;
    navigateLogout: () => void;
  }) => {
    const token = getCookie(tokenKey);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Get me
    const { data } = useSWR(token ? '/users/me' : null, fetchUser, {
      onErrorRetry: (error) => {
        // Never retry on 404.
        if (error.status === 401) {
          navigateLogout();
          return;
        }
      },
    });

    const user = data?.data;
    const finished = Boolean(data);
    const hasUser = Boolean(user);

    const logout = () => {
      setCookie(tokenKey, '');
      setIsAuthenticated(false);
      navigateLogout();
    };
    const login = (token: string) => {
      setIsAuthenticated(true);
      setCookie(tokenKey, token);
    };

    useEffect(() => {
      if (token && hasUser && finished) {
        setIsAuthenticated(true);
      }
    }, [token, hasUser, user, finished]);

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          logout,
          login,
          user,
          setIsAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
}

function createUseAuth<TContext>(AuthContext: React.Context<TContext>) {
  return () => useContext<TContext>(AuthContext);
}

export function createAuthentication<TDataUser = unknown>(
  config: AuthenticationConfig<TDataUser>
) {
  const AuthContext = createAuthContext<TDataUser>();
  const AuthProvider = createAuthProvider(AuthContext, config);
  const useAuth = createUseAuth(AuthContext);
  return {
    AuthContext,
    AuthProvider,
    useAuth,
  };
}
