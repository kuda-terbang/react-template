/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import useSWR from 'swr'

import { getCookie, setCookie } from './util-cookies'

interface TypeContext<TDataUser> {
  isAuthenticated: boolean
  logout: () => void
  login: (val: string) => void
  user?: TDataUser
  setIsAuthenticated: (val: boolean) => void
}

function createAuthContext<TDataUser>(): React.Context<TypeContext<TDataUser>> {
  return createContext<TypeContext<TDataUser>>({
    isAuthenticated: false,
    logout: () => ({}),
    login: () => ({}),
    user: undefined,
    setIsAuthenticated: () => ({}),
  })
}

interface AuthenticationConfig<TDataUser> {
  tokenKey: string,
  fetchUser: (axiosRequest?: AxiosRequestConfig) => Promise<AxiosResponse<TDataUser>>
  onFetchUserSuccess?: (user: TDataUser) => void
}

function createAuthProvider<TDataUser, TContext extends React.Context<TypeContext<TDataUser>>>(
  AuthContext: TContext,
  {
    tokenKey,
    fetchUser,
  }: AuthenticationConfig<TDataUser>
) {
  return ({
    children,
    navigateLogout,
  }: {
    children: React.ReactNode,
    navigateLogout: () => void,
  }) => {
    const token = getCookie(tokenKey)
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  
    // Get me
    const { data } = useSWR(token ? '/users/me' : null, fetchUser, {
      onErrorRetry: error => {
        // Never retry on 404.
        if (error.status === 401) {
          navigateLogout()
          return
        }
      },
    })
  
    const user = data?.data
    const finished = Boolean(data)
    const hasUser = Boolean(user)
  
    const logout = () => {
      setCookie(tokenKey, '')
      setIsAuthenticated(false)
      navigateLogout()
    }
    const login = (token: string) => {
      setIsAuthenticated(true)
      setCookie(tokenKey, token)
    }
  
    useEffect(() => {
      if (token && hasUser && finished) {
        setIsAuthenticated(true)
      }
    }, [token, hasUser, user, finished])

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
    )
  }
}

function createUseAuth<TContext>(AuthContext: React.Context<TContext>) {
  return () => useContext<TContext>(AuthContext)
}

type AuthSsrOptions = {
  destination: string
}
type WithAuthSsr<GetServerSideProps, GetServerSidePropsContext> = (options?: AuthSsrOptions, callback?: GetServerSideProps) => (context: GetServerSidePropsContext) => void

function createWithAuthSsr <
  TDataUser,
  GetServerSideProps,
  GetServerSidePropsContext,
>(
  config: AuthenticationConfig<TDataUser>
): WithAuthSsr<GetServerSideProps, GetServerSidePropsContext> {
  return (options, callback) => async (context) => {
    const ssrContext = context as unknown as { req: { cookies: { [key: string]: string }}}
    const tokenKey = ssrContext.req.cookies[config.tokenKey || '']
    const redirect = {
      permanent: false,
      destination: options?.destination || '/',
    }

    if (!tokenKey) {
      return { redirect }
    }
  
    try {
      const result = await config.fetchUser({
        headers: {
          Authorization: 'Bearer ' + tokenKey,
        }
      })
      if (!result.data) {
        return { redirect }
      }
    } catch (err) {
      return { redirect }
    }
  
    if (typeof callback === 'function') {
      callback(context)
    }
    return {
      props: {}
    }
  }
}

/**
 * 
 * @param config Configuration to set key to store token, and promise function to get user data
 */
export function createAuthentication<
  TDataUser,
  GetServerSideProps = unknown,
  GetServerSidePropsContext = unknown,
>(
  config: AuthenticationConfig<TDataUser>,
  renderType: 'ssr' | 'csr',
): {
  AuthContext: React.Context<TypeContext<TDataUser>>,
  AuthProvider: ({ children, navigateLogout, }: {
    children: React.ReactNode;
    navigateLogout: () => void;
  }) => JSX.Element,
  useAuth: () => TypeContext<TDataUser>,
  withProtectedSsr?: WithAuthSsr<GetServerSideProps, GetServerSidePropsContext>
}
{
  const AuthContext = createAuthContext<TDataUser>()
  const AuthProvider = createAuthProvider(AuthContext, config)
  const useAuth = createUseAuth(AuthContext)
  const returned = {
    AuthContext,
    AuthProvider,
    useAuth,
  }
  if (renderType === 'ssr') {
    const withProtectedSsr = createWithAuthSsr<TDataUser, GetServerSideProps, GetServerSidePropsContext>(config)
    return {
      ...returned,
      withProtectedSsr,
    }
  }
  return returned
}
