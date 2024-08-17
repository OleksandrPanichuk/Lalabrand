'use client';

import { Checkbox, Disclosure } from '@/components/ui';
import { useShopStore } from '@/features/shop';
import { sizes as data } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import styles from './SizePicker.module.scss';

export const SizePicker = () => {
  const t = useTranslations('Shop');

  const { sizes, toggleSize } = useShopStore((state) => ({
    sizes: state.sizes,
    toggleSize: state.toggleSize,
  }));

  return (
    <Disclosure className={styles.wrapper}>
      <Disclosure.Trigger>{t('Size')}</Disclosure.Trigger>
      <Disclosure.Content className={styles.inner}>
        {data.map((size) => (
          <label key={size}>
            <Checkbox
              checked={sizes.includes(size)}
              onChange={() => toggleSize(size)}
            />
            {size}
          </label>
        ))}
      </Disclosure.Content>
    </Disclosure>
  );
};
