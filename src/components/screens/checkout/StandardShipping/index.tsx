'use client';
import { SvgIcon } from '@/components/common';
import { Input, Label } from '@/components/ui';
import { useCheckoutStore } from '@/store';
import { RadioGroup } from '@headlessui/react';
import { useTranslations } from 'next-intl';
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

StandardShipping.Form = function Form() {
  const t = useTranslations('Checkout.Shipping.Standard.Fields');
  const { data, setData } = useCheckoutStore((state) => ({
    setData: state.setShippingData,
    data: state.shippingData,
  }));

  return (
    <form className={styles.form}>
      <Label htmlFor="first-name">
        {t('First name')}
        <Input
          value={data?.firstName ?? ''}
          onChange={(e) => setData({ firstName: e.target.value })}
          size={'lg'}
          placeholder={t('First name')}
        />
      </Label>
      <Label>
        {t('Last name')}
        <Input
          value={data?.lastName ?? ''}
          onChange={(e) => setData({ lastName: e.target.value })}
          size={'lg'}
          placeholder={t('Last name')}
        />
      </Label>
      <Label>
        {t('Address line 1')}
        <Input
          value={data?.address1 ?? ''}
          onChange={(e) => setData({ address1: e.target.value })}
          size={'lg'}
          placeholder={t('Address line 1')}
        />
      </Label>
      <Label>
        {t('Address line 2')}
        <Input
          value={data?.address2 ?? ''}
          onChange={(e) => setData({ address2: e.target.value })}
          size={'lg'}
          placeholder={t('Address line 2')}
        />
      </Label>
      <Label>
        {t('City')}
        <Input
          value={data?.city ?? ''}
          onChange={(e) => setData({ city: e.target.value })}
          size="lg"
          placeholder={t('City')}
        />
      </Label>
      <Label>
        {t('Zip code')}
        <InputMask
          mask={'99999'}
          maskChar={null}
          value={data?.zipCode ?? ''}
          onChange={(e) => setData({ zipCode: e.target.value })}
        >
          {/* @ts-ignore */}
          {() => <Input size={'lg'} placeholder={t('Zip code')} />}
        </InputMask>
      </Label>
      <Label>
        {t('Country')}
        <Input
          value={data?.country ?? ''}
          onChange={(e) => setData({ country: e.target.value })}
          size="lg"
          placeholder={t('Country')}
        />
      </Label>
      <Label>
        {t('Phone number')}
        <PhoneInput
          containerClass={styles['phone-field']}
          inputClass={styles['phone-input']}
          placeholder="+650 XX XX XXXX"
          value={data?.phoneNumber ?? ''}
          onChange={(phone) => setData({ phoneNumber: phone })}
        />
      </Label>
    </form>
  );
};

export { StandardShipping };
