import { SEND_RESET_PASSWORD_TOKEN_MUTATION } from '@/graphql';
import { GQLErrorsClassifications } from '@/shared/constants';
import { MutationHookOptions, useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { SendResetPassTokenInput } from '../types';

export const useSendResetPassCode = (options?: MutationHookOptions) => {
  const t = useTranslations('Auth');

  const [mutate, state] = useMutation(SEND_RESET_PASSWORD_TOKEN_MUTATION, {
    ...options,
    onError: (error) => {
      options?.onError?.(error);

      if (error.message && !!error.graphQLErrors[0]) {
        return toast.error(error.message);
      }

      if (
        error.graphQLErrors[0].extensions.classification ===
        GQLErrorsClassifications.NOT_FOUND
      ) {
        // TODO: Add error translation
        return toast.error(
          'User with email oleksandr.panichuk.dev@gmail.c does not exist',
        );
      }
      // TODO: Add error translation
      return toast.error('Something went wrong');
    },
  });

  const sendResetPassToken = useCallback(
    (input: SendResetPassTokenInput) => {
      return mutate({
        variables: input,
      });
    },
    [mutate],
  );

  return [sendResetPassToken, state] as const;
};
