import { z } from 'zod'
import { isValidPassword } from '../utils'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Auth.Email.Required' })
    .min(1, 'Auth.Email.Required')
    .email('Auth.Email.Invalid'),
  password: z
    .string({ required_error: 'Auth.Password.Required' }).min(8, 'Auth.Password.Short')
});

export const signUpSchema = 
    z.object({
      email: z
      .string({ required_error: 'Auth.Email.Required' })
      .min(1, 'Auth.Email.Required')
      .email('Auth.Email.Invalid'),
    password: z
      .string({ required_error: 'Auth.Password.Required' })
      .refine((val) => !!val, 'Auth.Password.Required')
      .refine((val) => isValidPassword(val), 'Auth.Password.Invalid format'),
      confirmPassword: z
        .string({ required_error: 'Auth.Password.Required' })
        .refine((val) => !!val, 'Auth.Password.Confirm required'),
      agreed: z.boolean().refine((val) => val),
      newsletter: z.boolean(),
    })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: 'Auth.Password.No match', path: ['confirmPassword'] },
  )
  .refine((data) => data.password && isValidPassword(data.password));
