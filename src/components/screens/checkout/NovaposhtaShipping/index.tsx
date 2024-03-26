'use client';
import { SvgIcon } from '@/components/common';
import { Input, Label } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { useCheckoutStore } from '@/store';
import { RadioGroup } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './NovaposhtaShipping.module.scss';

type OptionProps = {
  className?: string;
};

type TypeComponent = {
  Option: (props: OptionProps) => JSX.Element;
  Form: () => JSX.Element;
};

const NovaposhtaShipping = {} as TypeComponent;

NovaposhtaShipping.Option = function Option({ className }) {
  const data = useCheckoutStore((state) => state.novaposhtaData);
  const t = useTranslations('Checkout.Shipping');

  return (
    <RadioGroup.Option className={className} value={'novaposhta'}>
      <div />

      <div>
        <SvgIcon name="novaposhta" width={16} />
      </div>

      <div>
        <RadioGroup.Label>{t('Novaposhta.Label')}</RadioGroup.Label>
        <RadioGroup.Description>
          {!!data ? data : t("Info")}
        </RadioGroup.Description>
      </div>
    </RadioGroup.Option>
  );
};

NovaposhtaShipping.Form = function Form() {
  const t = useTranslations("Checkout.Shipping.Novaposhta")
  const { data, setData } = useCheckoutStore((state) => ({
    data: state.novaposhtaData,
    setData: state.setNovaposhtaData,
  }));
  const [value, setValue] = useState<string>(data ?? '');

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (data !== debouncedValue) setData(debouncedValue);
  }, [debouncedValue]);


  return (
    <form className={styles.form}>
      <Label htmlFor="novaposhta">{t("FormLabel")}</Label>
      <Input
        value={value}
        size={'md'}
        onChange={(e) => setValue(e.target.value)}
        id="novaposhta"
        placeholder={t('Placeholder')}
      />
    </form>
  );
};

export { NovaposhtaShipping };
