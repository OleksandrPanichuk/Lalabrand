import {
  emailFormSchema,
  resetPasswordFormSchema,
  signInSchema,
  signUpSchema,
} from '@/features/auth';
import { TypeUser } from '@/shared/types';
import { z } from 'zod';

export type EmailFormValues = z.infer<typeof emailFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export type SignUpInput = Pick<SignUpFormValues, 'email' | 'password'>;
export type SignInInput = SignInFormValues;
export type SendResetPassTokenInput = EmailFormValues;
export type ResetPasswordInput = Omit<
  ResetPasswordFormValues,
  'confirmPassword'
> &
  EmailFormValues;


export type SignUpResponse = {
  user: Pick<TypeUser, 'email' | 'id'>;
};
export type SignInResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
