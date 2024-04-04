import { PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export const defaultShippingInfoSchema = z.object({
  firstName: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'StandardShipping.First name',
    })
    .optional(),
  lastName: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'StandardShipping.Last name',
    })
    .optional(),
  address1: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 3, {
      message: 'StandardShipping.Address1',
    })
    .optional(),
  address2: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 3, {
      message: 'StandardShipping.Address2',
    })
    .optional(),
  city: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'StandardShipping.City',
    })
    .optional(),
  zipCode: z
    .string()
    .refine((val) => val.trim() === '' || val.length === 5, {
      message: 'StandardShipping.Zip code',
    })
    .optional(),
  country: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'StandardShipping.Country',
    })
    .optional(),
  phone: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === '') return true;

        try {
          const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(`+${value}`);
          return phoneNumberUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      },
      { message: 'StandardShipping.Phone' },
    )
    .optional(),
});

export const standardShippingSchema = z.object({
  firstName: z.string().min(2, 'StandardShipping.First name'),
  lastName: z.string().min(2, 'StandardShipping.Last name'),
  address1: z.string().min(3, 'StandardShipping.Address1'),
  address2: z.string().min(3, 'StandardShipping.Address2'),
  city: z.string().min(2, 'StandardShipping.City'),
  zipCode: z
    .string()
    .length(5, 'StandardShipping.Zip code'),
  country: z.string().min(2,'StandardShipping.Country'),
  phone: z.string().refine(
    (value) => {
      try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(`+${value}`);
        return phoneNumberUtil.isValidNumber(phoneNumber);
      } catch (error) {
        return false;
      }
    },
    { message: 'StandardShipping.Phone' },
  ),
});

export const cardShippingSchema = z.object({
  name: z.string().min(1, 'CardPayment.Name'),
  cvc: z.string().length(3, 'CardPayment.CVC'),
  date: z
    .string()
    .length(5, 'CardPayment.Date.Length')
    .refine(
      (value) => {
        const dates = value.split('/').map((val) => +val);
        return dates[0] > 0 && dates[0] <= 31;
      },
      { message: 'CardPayment.Date.Invalid' },
    ),
  cardNumber: z.string().length(19, 'CardPayment.Card number'),
});
