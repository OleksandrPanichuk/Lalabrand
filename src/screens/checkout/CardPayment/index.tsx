'use client';

import { SvgIcon } from '@/components/common';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui';
import { cardShippingSchema } from '@/shared/schemas';
import { useCheckoutStore } from '@/store';
import { RadioGroup } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import styles from './CardPayment.module.scss';

type OptionProps = {
  className?: string;
};

type TypeComponent = {
  Option: (props: OptionProps) => JSX.Element;
  Form: () => JSX.Element;
};

export const CardPayment = {} as TypeComponent;

CardPayment.Option = function Option({ className }) {
  const t = useTranslations('Checkout.Payment.Card');
  return (
    <RadioGroup.Option className={className} value={'card'}>
      <div />

      <div>
        <SvgIcon
          name="card"
          width={32}
          height={32}
          stroke="var(--text-color)"
          fill="transparent"
        />
      </div>

      <div>
        <RadioGroup.Label>{t('Title')}</RadioGroup.Label>
        <RadioGroup.Description>{t('Description')}</RadioGroup.Description>
      </div>
    </RadioGroup.Option>
  );
};

type TypeFormData = z.infer<typeof cardShippingSchema>;

CardPayment.Form = function CardPaymentForm() {
  const t = useTranslations('Checkout.Payment.Card');
  const { data, setData } = useCheckoutStore((state) => ({
    data: state.cardData,
    setData: state.setCardData,
  }));

  const form = useForm<TypeFormData>({
    resolver: zodResolver(cardShippingSchema),
    mode: 'onBlur',
  });

  const { control, watch } = form;

  const formData = watch();

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if (data?.[key as keyof TypeFormData] !== value) {
        setData({ [key]: value });
      }
    });
  }, [data, formData, setData]);

  return (
    <Form {...form}>
      <form className={styles.form}>
      <h4>{t('Card info')}</h4>
      <div className={styles.info}>
        <FormField
          control={control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <div className={styles.number}>
                <FormControl>
                  <InputMask
                    mask={'9999 9999 9999 9999'}
                    maskChar={null}
                    {...field}
                  >
                    {/* @ts-ignore */}
                    {() => (
                      <Input size="md" placeholder="0000 0000 0000 0000" />
                    )}
                  </InputMask>
                </FormControl>
                <div>
                  <Image
                    src="/images/checkout/visa.png"
                    unoptimized
                    alt="visa"
                    width={32}
                    height={11}
                  />

                  <SvgIcon name="mastercard" width={18} />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMask mask="99/99" maskChar={null} {...field}>
                  {/* @ts-ignore */}
                  {() => <Input size="md" placeholder="MM/YY" />}
                </InputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="cvc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMask mask="999" maskChar={null} {...field}>
                  {/* @ts-ignore */}
                  {() => <Input size="md" placeholder="CVC" />}
                </InputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <h4>{t('Name on card')}</h4>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('Name')} size="md" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
    </Form>
  );
};
