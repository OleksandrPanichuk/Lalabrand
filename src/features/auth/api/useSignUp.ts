import { useAuth } from '@/components/providers'
import { SignUpInput, SignUpResponse } from '@/features/auth'
import { SIGN_UP_MUTATION } from '@/graphql'
import { MutationHookOptions, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const useSignUp = (options?:MutationHookOptions<SignUpResponse>) => {
  const { setUser } = useAuth();

  const [mutate, state] = useMutation<SignUpResponse>(SIGN_UP_MUTATION, {
    ...options,
    onCompleted: ({user}) => {
      setUser(user);

      options?.onCompleted?.({user})
    },
    onError: (error) => {
      options?.onError?.(error)
      if (error.message && !!error.graphQLErrors[0]) {
        return toast.error(error.message);
      }
      // TODO: Add error translation
      toast.error('Failed to sign up');
    },
  });

  const signUp = useCallback(
    (input: SignUpInput) => {
      return mutate({
        variables: {
          input: {
            email: input.email,
            password: input.password,
          },
        },
      });
    },
    [mutate],
  );

  return [signUp, state] as const;
};
