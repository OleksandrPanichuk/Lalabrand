'use client';
import { NumberInput } from '@/components/ui';
import { Picker } from '@/screens/shop';
import { useShopStore } from '@/store';
import { useTranslations } from 'next-intl';
import styles from './PricePicker.module.scss';

const MIN = 0;
const MAX = 1_000_000;
const PRECISION = 2;

export const PricePicker = () => {
  const t = useTranslations('Shop');

  const price = useShopStore((state) => state.price);
  const setPrice = useShopStore((state) => state.setPrice);

  return (
    <Picker>
      <Picker.Trigger>{t('Price')}</Picker.Trigger>
      <Picker.Content className={styles.content}>
        <div className={styles.field}>
          <div>
            $
            <NumberInput
              value={price.min}
              onChange={(min) => setPrice({ ...price, min })}
              min={MIN}
              max={MAX}
              precision={PRECISION}
              placeholder="0"
              id="price-min"
            />
          </div>
          <label htmlFor="price-min">Min</label>
        </div>

        <div className={styles.dash} />

        <div className={styles.field}>
          <div>
            $
            <NumberInput
              value={price.max}
              onChange={(max) => setPrice({ ...price, max })}
              min={price.min || MIN}
              max={MAX}
              precision={PRECISION}
              placeholder="500"
              id="price-max"
            />
          </div>
          <label htmlFor="price-max">Max</label>
        </div>
      </Picker.Content>
    </Picker>
  );
};
