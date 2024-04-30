import { TypeQueryData } from '@/store';
import isEqual from 'lodash.isequal';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { parseFiltersFromSearchParams } from './parseFiltersFromSearchParams';

export function getQueryVariables(
  searchParams: ReadonlyURLSearchParams,
  query: TypeQueryData,
  page: number,
	isFirstRender: boolean
) {
  const parsed = parseFiltersFromSearchParams(searchParams);
  const filters = isFirstRender ? getFilteredQuery(query, parsed.query) : query


  return {
    page: getPage(page, parsed.page),
    query: filters,
    category: searchParams.get('category') ,
    type: searchParams.get('type'), 
		title: JSON.stringify(filters)
  };
}

function getFilteredQuery(
  query: TypeQueryData,
  parsedQuery: Partial<TypeQueryData>,
) {
  const isFiltersEqual = isEqual(query, parsedQuery);
  if (isFiltersEqual) return query;

  const hasColors = parsedQuery.colors?.length;
  const hasSizes = parsedQuery.sizes?.length;

  if (
    (hasColors && !query.colors.length) ||
    (hasSizes && !query.sizes.length) 
  ) {
    return parsedQuery;
  } else {
    return query;
  }
}

function getPage(page: number, parsedPage?: number) {
  return parsedPage && page !== parsedPage ? parsedPage : page;
}
