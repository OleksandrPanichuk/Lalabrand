'use client';
import { SvgIcon } from '@/components/common';
import { useAuth } from '@/components/providers';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { standardShippingSchema } from '@/shared/schemas';
import { TypeDefaultShippingData } from '@/shared/types';
import { useCheckoutStore } from '@/features/checkout';
import { RadioGroup } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import PhoneInput from 'react-phone-input-2';
import styles from './StandardShipping.module.scss';

type OptionProps = {
  className?: string;
};

type TypeComponent = {
  Option: (props: OptionProps) => JSX.Element;
  Form: () => JSX.Element;
};

const StandardShipping = {} as TypeComponent;

StandardShipping.Option = function Option({ className }) {
  const t = useTranslations('Checkout.Shipping');
  return (
    <RadioGroup.Option className={className} value={'standard'}>
      <div />

      <div>
        <SvgIcon name="home" width={21.33} />
      </div>

      <div>
        <RadioGroup.Label>{t('Standard.Label')}</RadioGroup.Label>
        {/* TODO: add description */}
        <RadioGroup.Description>{t('Info')}</RadioGroup.Description>
      </div>
    </RadioGroup.Option>
  );
};

StandardShipping.Form = function StandardShippingForm() {
  const t = useTranslations('Checkout.Shipping.Standard.Fields');
  const { setData, data } = useCheckoutStore((state) => ({
    setData: state.setShippingData,
    data: state.shippingData,
  }));

  const form = useForm<TypeDefaultShippingData>({
    resolver: zodResolver(standardShippingSchema),
    mode: 'onBlur',
  });

  const { control, reset, watch } = form;

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const data = {
        ...(!!user.address && user.address),
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      setData(data);
      reset(data);
    } else {
      setData(null);
      reset({});
    }
  }, [user, setData, reset]);

  const formData = watch();

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if(data?.[key as keyof TypeDefaultShippingData] !== value) {
        setData({[key]:value})
      }
    });
  }, [data, formData, setData]);

  return (
    <Form {...form}>
      <form className={styles.form}>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('First name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('First name')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Last name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('Last name')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t('Address line 1')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('Address line 1')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t('Address line 2')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('Address line 2')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t('City')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('City')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Zip code')}</FormLabel>
              <FormControl>
                <InputMask
                  mask={'99999'}
                  maskChar={null}
                  {...field}
                >
                  {/* @ts-ignore */}
                  {() => <Input size={'lg'} placeholder={t('Zip code')} />}
                </InputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t('Country')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  size={'lg'}
                  placeholder={t('Country')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Phone number')}</FormLabel>
              <FormControl>
                <PhoneInput
                  containerClass={styles['phone-field']}
                  inputClass={styles['phone-input']}
                  placeholder="+650 XX XX XXXX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export { StandardShipping };
