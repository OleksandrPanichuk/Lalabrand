import {
  colors as colorsMap,
  sizes as sizesMap,
  sortByMap,
} from '@/shared/constants';
import { TypeSize, TypeSortBy } from '@/shared/types';
import { TypePrice } from '@/store';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { z } from 'zod';

export function parseFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams,
) {
  const parseArray = <T>(key: string) => {
    const value = searchParams.get(key);
    return value ? (JSON.parse(value) as T[]) : undefined;
  };

  const sizes = parseArray<TypeSize>('sizes');
  const colors = parseArray<string>('colors');
  const sortBy = searchParams.get('sortBy') as TypeSortBy | null;
  const page = searchParams.get('page');
  const price = searchParams.get('price');

  const parsedSizes = sizes?.filter((el) => sizesMap.includes(el));
  const parsedPrice = price ? parsePrice(price) : undefined;
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

  const query = {
    sortBy: parsedSortBy,
    sizes: parsedSizes,
    colors: parsedColors,
    price: parsedPrice,
  };

  const queryParams = Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v !== undefined),
  );

  return {
    query: queryParams,
    page: parsedPage,
  };
}

const parsePrice = (price: string) => {
  const priceJSON = JSON.parse(price) as TypePrice;

  const parseValue = (value: number | undefined) =>
    value ? z.number().safeParse(value) : undefined;

  const parsedMin = parseValue(priceJSON.min);
  const parsedMax = parseValue(priceJSON.max);


  if (!parsedMin && !parsedMax) return undefined;

  if (parsedMin?.success && !parsedMax?.success) {
    return { min: parsedMin.data };
  }
  if (!parsedMin?.success && parsedMax?.success) return { max: parsedMax.data };

  return parsedMin?.success && parsedMax?.success
    ? { min: parsedMin.data, max: parsedMax.data }
    : undefined;
};
