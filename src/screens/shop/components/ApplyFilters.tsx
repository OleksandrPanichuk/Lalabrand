'use client';

import { parseFiltersFromSearchParams } from '@/screens/shop';
import { useShopStore } from '@/store';
import { usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect } from 'react';

export const ApplyFilters = () => {
  const filters = useShopStore((state) => state.query);
  const page = useShopStore((state) => state.page);
  const setFilters = useShopStore((state) => state.setFilters);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    console.log('FILTERS', filters);
  }, [filters]);

  useEffect(() => {
    const filtersFromParams = parseFiltersFromSearchParams(searchParams);

    setFilters(filtersFromParams);
  }, [searchParams, setFilters]);

  useEffect(() => {
    const type = searchParams.get('type') ?? undefined;
    const category = searchParams.get('category') ?? undefined;

    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        type,
        category,
        page,
        sizes: filters.sizes.length ? JSON.stringify(filters.sizes) : undefined,
        colors: filters.colors.length
          ? JSON.stringify(filters.colors)
          : undefined,
        sortBy: filters.sortBy,
        price:
          filters.price.min || filters.price.max
            ? JSON.stringify(filters.price)
            : undefined,
      },
    });
    window.history.pushState(null, '', url);
  }, [filters, page, pathname, searchParams]);

  return null;
};
