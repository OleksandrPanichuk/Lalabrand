'use client';

import {
  colors as colorsMap,
  sizes as sizesMap,
  sortByMap,
} from '@/shared/constants';
import { TypeSize, TypeSortBy } from '@/shared/types';
import { useShopStore } from '@/store';
import { usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

export const ApplyFilters = () => {
  const filters = useShopStore((state) => state.query);
  const page = useShopStore((state) => state.page);
  const setFilters = useShopStore((state) => state.setFilters);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const sizes = searchParams.get('sizes')
      ? (JSON.parse(searchParams.get('sizes')!) as TypeSize[])
      : undefined;
    const colors = searchParams.get('colors')
      ? (JSON.parse(searchParams.get('colors')!) as string[])
      : undefined;
    const sortBy = searchParams.get('sortBy') as TypeSortBy | null;

    const page = searchParams.get('page');

    const parsedSizes = sizes?.filter((el) => sizesMap.includes(el));

    const parsedColors = colors?.filter((el) =>
      colorsMap.some((item) => item.value === el),
    );

    const parsedPage = page
      ? Number.isNaN(+page)
        ? undefined
        : +page
      : undefined;
    const parsedSortBy =
      sortBy && sortByMap.includes(sortBy) ? sortBy : undefined;

    const filtersFromParams: Partial<typeof filters & { page?: number }> = {
      ...(!!parsedSizes && { sizes: parsedSizes }),
      ...(!!parsedColors && { colors: parsedColors }),
      ...(!!parsedPage && { page: parsedPage }),
      sortBy: parsedSortBy,
    };

    setFilters(filtersFromParams);
  }, [searchParams, setFilters]);

  useEffect(() => {
    if (isFirstRender) return setIsFirstRender(false);

    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        page,
        sizes: filters.sizes.length ? JSON.stringify(filters.sizes) : undefined,
        colors: filters.colors.length
          ? JSON.stringify(filters.colors)
          : undefined,
        sortBy: filters.sortBy !== 'newest' ? filters.sortBy : undefined,
      },
    });
    window.history.replaceState(null, '', url);
  }, [filters, page, pathname, isFirstRender]);

  return null;
};
