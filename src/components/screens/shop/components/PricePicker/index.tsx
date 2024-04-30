'use client';
import { Picker } from '@/components/screens/shop';
import { useShopStore } from '@/store';
import { useTranslations } from 'next-intl';
import { NumberInput } from '@/components/ui';

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
      <Picker.Content className="py-4">
        <NumberInput
          value={price.min}
          onChange={(min) => setPrice({ ...price, min })}
          min={MIN}
          max={MAX}
          precision={PRECISION}
        />
        <NumberInput
          value={price.max}
          onChange={(max) => setPrice({ ...price, max })}
          min={price.min || MIN}
          max={MAX}
          precision={PRECISION}
        />
      </Picker.Content>
    </Picker>
  );
};
