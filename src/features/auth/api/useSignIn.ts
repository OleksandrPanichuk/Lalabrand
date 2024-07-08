'use client';
import { useAuth } from '@/components/providers';
import { UserInfoResponse } from '@/features/profile';
import { SIGN_IN_MUTATION, USER_INFO_QUERY } from '@/graphql';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { MutationHookOptions, useLazyQuery, useMutation } from '@apollo/client';
import { setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { SignInInput, SignInResponse } from '../types';

export const useSignIn = (options?:MutationHookOptions<SignInResponse>) => {
  const { setUser } = useAuth();

  const [getUserInfo] = useLazyQuery<UserInfoResponse>(USER_INFO_QUERY, {
    onCompleted: (data) => {
      setUser(data.user);
    },
  });

  const [mutate, state] = useMutation<SignInResponse>(SIGN_IN_MUTATION, {
    ...options,
    onCompleted: async ({ tokens }) => {
      const { exp } = jwtDecode(tokens.accessToken);

      setCookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
        expires: new Date(exp! * 1000),
      });
      setCookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken);

      await getUserInfo();

      options?.onCompleted?.({tokens})
    },
    onError: (error) => {
      options?.onError?.(error)
      if (error.message && !!error.graphQLErrors[0]) {
        return toast.error(error.message);
      }
      toast.error('Failed to sign in');
    },
  });

  const signIn = useCallback(
    (input: SignInInput) => {
      return mutate({
        variables: {
          input,
        },
      });
    },
    [mutate],
  );

  return [signIn, state] as const;
};
