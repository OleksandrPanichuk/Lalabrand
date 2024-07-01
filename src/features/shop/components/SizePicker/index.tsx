'use client';

import { Checkbox } from '@/components/ui';
import { Picker, useShopStore } from '@/features/shop';
import { sizes as data } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import styles from './SizePicker.module.scss';
// TODO: Rewrite this component using Disclosure instead of Picker
export const SizePicker = () => {
  const t = useTranslations('Shop');

  const { sizes, toggleSize } = useShopStore((state) => ({
    sizes: state.sizes,
    toggleSize: state.toggleSize,
  }));

  return (
    <Picker className={styles.wrapper}>
      <Picker.Trigger>{t('Size')}</Picker.Trigger>
      <Picker.Content className={styles.inner}>
        {data.map((size) => (
          <label key={size}>
            <Checkbox
              checked={sizes.includes(size)}
              onChange={() => toggleSize(size)}
            />
            {size}
          </label>
        ))}
      </Picker.Content>
    </Picker>
  );
};
