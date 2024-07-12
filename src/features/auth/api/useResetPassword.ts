import { ResetPasswordInput } from '@/features/auth';
import { RESET_PASSWORD_MUTATION } from '@/graphql';
import { MutationHookOptions, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export const useResetPassword = (options?: MutationHookOptions) => {
  const [mutate, state] = useMutation(RESET_PASSWORD_MUTATION, {
    ...options,
  });

  const resetPassword = useCallback(
    (input: ResetPasswordInput) => {
      return mutate({
        variables: {
          input,
        },
      });
    },
    [mutate],
  );

  return [resetPassword, state] as const;
};
