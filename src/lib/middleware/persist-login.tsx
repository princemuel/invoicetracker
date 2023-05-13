import type { Project } from '@src/@types';
import { Loader } from '@src/components';
import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../client';
import { useAuthDispatch, useAuthState } from '../context';
import { usePersist, useRefreshAuthQuery } from '../hooks';
import { AuthError } from './error';

const messages = [
  'email was not found',
  'token is invalid',
  'token has expired',
  'Internal Server Error',
];

interface Props {}

const PersistLogin = (props: Props) => {
  const [persist] = usePersist();
  const location = useLocation();

  const auth = useAuthState();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const [isTrueSuccess, setIsTrueSuccess] = React.useState(false);
  const [isTrueError, setIsTrueError] = React.useState(false);

  const token = auth.token;

  const refreshAuth = useRefreshAuthQuery(client, undefined, {
    enabled: !token && persist && !isTrueError,
    retry: (failureCount, error: Project.IErrorResponse) => {
      if (failureCount > 1) return false;

      const isRefreshAuthError = messages.some((message) => {
        return error?.response?.errors?.[0].message.includes(message);
      });

      return !isRefreshAuthError;
    },
    onSuccess(data) {
      setIsTrueSuccess(true);
      dispatch('auth/addToken');
    },
    onError(err: Project.IErrorResponse) {
      err?.response?.errors?.forEach((error) => {
        toast.error(error?.message);
      });

      const isRefreshAuthError = messages.some((message) =>
        err?.response?.errors?.[0].message.includes(message)
      );

      if (isRefreshAuthError) {
        setIsTrueError(true);
        dispatch('auth/logout');
      }
    },
  });

  let content: JSX.Element = <></>;

  // after logout, clear all tokens, block all and take user to login
  // persist and token ? outlet ...
  // on browser window reopen, if token is not yet expired, refresh token

  // !persist and token ? outlet
  // on browser window reopen, tho' token is not yet expired, take user to login

  if (!persist && token) {
    // persist: no
    console.log('%c no persist', 'color: yellow;');
    content = <Outlet />;
  } else if (refreshAuth.status === 'loading') {
    //persist: yes, token: no
    console.log('%c loading', 'color: blue;');
    // add a loader here
    content = <Loader />;
  } else if (isTrueError) {
    //persist: yes, token: no
    console.log('%c error', 'color: red;');
    content = (
      <AuthError message={refreshAuth?.error?.response?.errors[0]?.message} />
    );
  } else if (isTrueSuccess) {
    //persist: yes, token: yes
    console.log('%c success', 'color: green;');
    content = <Outlet />;
  } else if (token && refreshAuth.fetchStatus === 'idle') {
    //persist: yes, token: yes
    console.log('%c Token and Uninitialized', 'color: pink;');
    console.log(refreshAuth.fetchStatus);
    content = <Outlet />;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export { PersistLogin };
