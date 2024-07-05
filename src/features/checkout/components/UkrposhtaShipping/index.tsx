'use client';
import { SvgIcon } from '@/components/common';
import { Input, Label } from '@/components/ui';
import { useCheckoutStore } from '@/features/checkout';
import { useDebounce } from '@/hooks';
import { RadioGroup } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './UkrposhtaShipping.module.scss';

type OptionProps = {
  className?: string;
};

type TypeComponent = {
  Option: (props: OptionProps) => JSX.Element;
  Form: () => JSX.Element;
};

const UkrposhtaShipping = {} as TypeComponent;

UkrposhtaShipping.Option = function Option({ className }) {
  const data = useCheckoutStore((state) => state.ukrposhtaData);
  const t = useTranslations('Checkout.Shipping');

  return (
    <RadioGroup.Option className={className} value={'ukrposhta'}>
      <div />

      <div>
        <SvgIcon name="ukrposhta" width={27} />
      </div>

      <div>
        <RadioGroup.Label>{t('Ukrposhta.Label')}</RadioGroup.Label>
        <RadioGroup.Description>
          {!!data ? data : t('Info')}
        </RadioGroup.Description>
      </div>
    </RadioGroup.Option>
  );
};

UkrposhtaShipping.Form = function Form() {
  const t = useTranslations('Checkout.Shipping.Ukrposhta');
  const { data, setData } = useCheckoutStore((state) => ({
    data: state.ukrposhtaData,
    setData: state.setUkrposhtaData,
  }));
  const [value, setValue] = useState<string>(data ?? '');

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (data !== debouncedValue) setData(debouncedValue);
  }, [debouncedValue]);

  return (
    <form className={styles.form}>
      <Label htmlFor="ukrposhta">{t('FormLabel')}</Label>
      <Input
        value={value}
        size={'md'}
        onChange={(e) => setValue(e.target.value)}
        id="ukrposhta"
        placeholder={t('Placeholder')}
      />
    </form>
  );
};

export { UkrposhtaShipping };
