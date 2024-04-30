'use client';

import { Button } from "@/components/ui"
import { useShopStore } from "@/store"
import isEqual from "lodash.isequal"
import { useTranslations } from "next-intl"

export const DrawerButtons = () => {
	const t = useTranslations('Shop.Buttons');

	const apply = useShopStore((state) => state.applyFilters);
  const reset = useShopStore((state) => state.resetFilters);

	const {data, query} = useShopStore((state => ({
		data: {
			sortBy:state.sortBy,
			colors: [...state.colors].sort(),
			sizes: [...state.sizes].sort(),
      price: {
        min: state.price.min,
        max: state.price.max
      }
		},
		query: {
      sortBy: state.query.sortBy,
      colors: [...state.query.colors].sort(),
      sizes: [...state.query.sizes].sort(),
      price: {
        min: state.query.price.min,
        max: state.query.price.max
      }
    }
	})))


  
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
