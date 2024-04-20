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
			colors: state.colors,
			sizes: state.sizes,
		},
		query: state.query
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
