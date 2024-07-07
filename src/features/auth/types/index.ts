import { signInSchema, signUpSchema } from '@/features/auth'
import { z } from 'zod'

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;

export type SignUpInput = Pick<SignUpFormValues, 'email' | 'password'>;
export type SignInInput = SignInFormValues;
