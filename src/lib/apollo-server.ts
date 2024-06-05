'use server';

import { XSRF_TOKEN_COOKIE_NAME } from '@/shared/constants'
import { HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { cookies } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  const token = cookies().get(XSRF_TOKEN_COOKIE_NAME)?.value ?? '';

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    headers: {
      'apollo-require-preflight': 'true',
      Cookie: cookies().toString(),
      'X-XSRF-TOKEN': token,
    },
    credentials: 'include',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink,
  });
});
