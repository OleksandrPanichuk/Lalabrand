import { PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export const defaultShippingInfoSchema = z.object({
  firstName: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'First name is too short',
    })
    .optional(),
  lastName: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'Last name is too short',
    })
    .optional(),
  address1: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 3, {
      message: 'Address 1 is too short',
    })
    .optional(),
  address2: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 3, {
      message: 'Address 2 is too short',
    })
    .optional(),
  city: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'City name is too short',
    })
    .optional(),
  zipCode: z
    .string()
    .refine((val) => val.trim() === '' || val.length === 5, {
      message: 'Zip code must be 5 characters length',
    })
    .optional(),
  country: z
    .string()
    .refine((val) => val.trim() === '' || val.length >= 2, {
      message: 'Country name is too short',
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
      { message: 'Invalid phone number' },
    )
    .optional(),
});

export const standardShippingSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  address1: z.string().min(3, 'Address 1 is too short'),
  address2: z.string().min(3, 'Address 2 is too short'),
  city: z.string().min(2, 'City name is too short'),
  zipCode: z
    .string()
    .length(5, 'Zip code must be 5 characters length'),
  country: z.string().min(2,'Country name is too short'),
  phone: z.string().refine(
    (value) => {
      try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(`+${value}`);
        return phoneNumberUtil.isValidNumber(phoneNumber);
      } catch (error) {
        return false;
      }
    },
    { message: 'Invalid phone number' },
  ),
});

export const cardShippingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cvc: z.string().length(3, 'CVC should be 3 characters long'),
  date: z
    .string()
    .length(5, 'Invalid date length')
    .refine(
      (value) => {
        const dates = value.split('/').map((val) => +val);
        return dates[0] > 0 && dates[0] <= 31;
      },
      { message: 'Invalid date' },
    ),
  cardNumber: z.string().length(19, 'Invalid card number length'),
});
