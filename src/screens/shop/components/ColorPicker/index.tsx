'use client';

import { Checkbox } from '@/components/ui';
import { cn } from '@/lib';
import { Picker } from '@/screens/shop';
import { colors as data } from '@/shared/constants';
import { useShopStore } from '@/store';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ColorPicker.module.scss';

export const ColorPicker = () => {
  const t = useTranslations();

  const { colors, toggleColor } = useShopStore((state) => ({
    colors: state.colors,
    toggleColor: state.toggleColor,
  }));

  const locale = useLocale();

  return (
    <Picker>
      <Picker.Trigger>{t('Shop.Color')}</Picker.Trigger>
      <Picker.Content
        className={cn(
          styles.inner,
          locale === 'ua' ? styles['inner--ua'] : styles['inner-en'],
        )}
      >
        {data.map((el) => (
          <label key={el.value}>
            <Checkbox
              checked={colors.includes(el.value)}
              onChange={() => toggleColor(el.value)}
            />
            <span
              style={{
                backgroundColor: el.color,
                borderColor:
                  el.value === 'WHITE' ? 'var(--secondary-200)' : el.color,
              }}
            />
            {t(el.label)}
          </label>
        ))}
      </Picker.Content>
    </Picker>
  );
};
