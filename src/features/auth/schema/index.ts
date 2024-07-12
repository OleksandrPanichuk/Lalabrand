import { z } from 'zod'
import { isValidPassword } from '../utils'

const emailSchema = z
  .string({ required_error: 'Auth.Email.Required' })
  .min(1, 'Auth.Email.Required')
  .email('Auth.Email.Invalid');

const passwordSchema = z
  .string({ required_error: 'Auth.Password.Required' })
  .refine((val) => !!val, 'Auth.Password.Required')
  .refine((val) => isValidPassword(val), 'Auth.Password.Invalid format');

const confirmPasswordSchema = z
  .string({ required_error: 'Auth.Password.Required' })
  .refine((val) => !!val, 'Auth.Password.Confirm required');

export const emailFormSchema = z.object({
  email: emailSchema,
});

export const signInSchema = emailFormSchema.merge(
  z.object({
    password: z
      .string({ required_error: 'Auth.Password.Required' })
      .min(8, 'Auth.Password.Short'),
  }),
);

export const signUpSchema = emailFormSchema
  .merge(
    z.object({
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
      agreed: z.boolean().refine((val) => val),
      newsletter: z.boolean(),
    }),
  )
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: 'Auth.Password.No match', path: ['confirmPassword'] },
  )
  .refine((data) => data.password && isValidPassword(data.password));

export const resetPasswordFormSchema = z
  .object({
    token: z
      .string()
      .min(1, 'Auth.Code.Required')
      .length(6, 'Auth.Code.Invalid'),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: 'Auth.Password.No match', path: ['confirmPassword'] },
  )
  .refine((data) => data.password && isValidPassword(data.password));
