'use client';

import { Button } from '@/components/ui';
import { IShopStore, TypeQueryData, useShopStore } from '@/store';
import isEqual from 'lodash.isequal';
import { useTranslations } from 'next-intl';

export const DrawerButtons = () => {
  const t = useTranslations('Shop.Buttons');

  const apply = useShopStore((state) => state.applyFilters);
  const reset = useShopStore((state) => state.resetFilters);

  const extractFilterData = (state: IShopStore | TypeQueryData) => ({
    sortBy: state.sortBy,
    colors: [...state.colors].sort(),
    sizes: [...state.sizes].sort(),
    price: {
      min: state.price.min,
      max: state.price.max,
    },
  });

  const { data, query } = useShopStore((state) => ({
    data: extractFilterData(state),
    query: extractFilterData(state.query),
  }));

  return (
    <div>
      <Button size="lg" variant="outline" onClick={reset}>
        {t('Clear All')}
      </Button>
      <Button size="lg" onClick={apply} disabled={isEqual(query, data)}>
        {t('Apply')}
      </Button>
    </div>
  );
};
