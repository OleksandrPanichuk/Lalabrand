'use client';

import { useAuth } from '@/components/providers';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { defaultShippingInfoSchema } from '@/features/checkout';
import { useClickOutside } from '@/hooks';
import { TypeAddress, TypeDefaultShippingData } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import PhoneInput from 'react-phone-input-2';
import styles from './page.module.scss';

const SettingsPage = () => {
  const t = useTranslations('Settings');
  const { user, setUser } = useAuth();

  const form = useForm<TypeDefaultShippingData>({
    resolver: zodResolver(defaultShippingInfoSchema),
    mode: 'onBlur',
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = form;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const ref = useRef<HTMLFormElement>(null);

  const onFormReset = useCallback(() => {
    if (!user) return;

    reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
      address1: user.address?.address1 ?? '',
      address2: user.address?.address2 ?? '',
      city: user.address?.city ?? '',
      country: user.address?.country ?? '',
      zipCode: user.address?.zipCode ?? '',
    });
  }, [reset, user]);

  useClickOutside([ref], () => {
    setIsEditing(false);
    onFormReset();
  });

  useEffect(() => {
    onFormReset();
  }, [user, onFormReset]);

  const onSubmit = (values: TypeDefaultShippingData) => {
    if (!user) return;

    const address: Partial<TypeAddress> = {
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      country: values.country,
      zipCode: values.zipCode,
    };
    const isAddressNotEmpty = Object.values(address).some(
      (val) => !!val === true,
    );

    if (isAddressNotEmpty && !user.address) {
      // Make a request to backend to add user address and provide address object with id

      address.id = '123';
    }

    // Make a request to update user

    setUser((prev) =>
      prev
        ? {
            ...prev,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: user.address
              ? {
                  ...user.address,
                  ...address,
                }
              : isAddressNotEmpty
                ? {
                    ...(address as Omit<TypeAddress, 'userId'>),
                    userId: prev.id,
                  }
                : undefined,
          }
        : null,
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2>{t('Title')}</h2>
      <Form {...form}>
        <form
          className={styles.form}
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div onClick={() => setIsEditing(true)}>
            <div>
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Fields.First name')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size={'lg'}
                        placeholder={t('Fields.First name')}
                        disabled={!isEditing}
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
                    <FormLabel>{t('Fields.Last name')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size={'lg'}
                        placeholder={t('Fields.Last name')}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Fields.Address line 1')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size={'lg'}
                      placeholder={t('Fields.Address line 1')}
                      disabled={!isEditing}
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
                  <FormLabel>{t('Fields.Address line 2')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size={'lg'}
                      placeholder={t('Fields.Address line 2')}
                      disabled={!isEditing}
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
                  <FormLabel>{t('Fields.City')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size={'lg'}
                      placeholder={t('Fields.City')}
                      disabled={!isEditing}
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
                  <FormLabel>{t('Fields.Zip code')}</FormLabel>
                  <FormControl>
                    <ReactInputMask mask={'99999'} maskChar={null} {...field}>
                      {/* @ts-ignore */}
                      {() => (
                        <Input
                          size={'lg'}
                          placeholder={t('Fields.Zip code')}
                          isDisabled={!isEditing}
                        />
                      )}
                    </ReactInputMask>
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
                  <FormLabel>{t('Fields.Country')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size="lg"
                      placeholder={t('Fields.Country')}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO:PhoneInput size fix */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Fields.Phone number')}</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      containerClass={styles['phone-field']}
                      inputClass={styles['phone-input']}
                      placeholder="+650 XX XX XXXX"
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={!isEditing || !isValid || !isDirty} type="submit">
            {t('Buttons.Save')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
