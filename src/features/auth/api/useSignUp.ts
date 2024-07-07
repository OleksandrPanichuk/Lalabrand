import { useAuth } from '@/components/providers'
import { SignUpInput } from '@/features/auth'
import { SIGN_UP_MUTATION } from '@/graphql'
import { TypeUser } from '@/shared/types'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const useSignUp = () => {
  const { setUser } = useAuth();
  const [mutate, state] = useMutation<TypeUser>(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      setUser(data)

    },
    onError: (error) => {
			if(error.message && !!error.graphQLErrors[0]) {
				return toast.error(error.message);
			}
      toast.error('Failed to sign up');
    },
  });

  const signUp = useCallback((input: SignUpInput) => {
    return mutate({
      variables: {
        input: {
          email: input.email,
          password: input.password,
        },
      },
    });
  }, [mutate]);


	return [signUp, state] as const
};
