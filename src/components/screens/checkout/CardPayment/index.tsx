'use client';

import { SvgIcon } from '@/components/common';
import { Input } from '@/components/ui';
import { useCheckoutStore } from '@/store';
import { RadioGroup } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import InputMask from 'react-input-mask';
import styles from './CardPayment.module.scss';
import Image from 'next/image';

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

CardPayment.Form = function Form() {
  const t = useTranslations('Checkout.Payment.Card');
  const { data, setData } = useCheckoutStore((state) => ({
    data: state.cardData,
    setData: state.setCardData,
  }));
  return (
    <form className={styles.form}>
      <h4>{t('Card info')}</h4>
      <div className={styles.info}>
        <div className={styles.number}>
          <InputMask
            mask={'9999 9999 9999 9999'}
            maskChar={null}
            value={data?.cardNumber ?? ''}
            onChange={(e) => setData({ cardNumber: e.target.value })}
          >
            {/* @ts-ignore */}
            {() => <Input size="md" placeholder="0000 0000 0000 0000" />}
          </InputMask>
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
        <InputMask
          mask="99/99"
          maskChar={null}
          value={data?.date ?? ''}
          onChange={(e) => setData({ date: e.target.value })}
        >
          {/* @ts-ignore */}
          {() => <Input size="md" placeholder="MM/YY" />}
        </InputMask>
        <InputMask
          mask="999"
          maskChar={null}
          value={data?.cvc ?? ''}
          onChange={(e) => setData({ cvc: e.target.value })}
        >
          {/* @ts-ignore */}
          {() => <Input size="md" placeholder="CVC" />}
        </InputMask>
      </div>
      <h4>{t('Name on card')}</h4>
      <Input
        placeholder={t('Name')}
        size="md"
        value={data?.name ?? ''}
        onChange={(e) => setData({ name: e.target.value })}
      />
    </form>
  );
};
