import { TypeSize, TypeSortBy } from '@/shared/types';
import isEqual from 'lodash.isequal';
import { create } from 'zustand';

export type TypePrice = {
  min?: number;
  max?: number;
};

export type TypeQueryData = {
  sortBy: TypeSortBy;
  sizes: TypeSize[];
  colors: string[];
  price: TypePrice;
};

export interface IShopStore {
  price: TypePrice;
  setPrice: (data: TypePrice) => void;

  sortBy: TypeSortBy;
  setSortBy: (val: TypeSortBy) => void;
  setSortByDrawer: (val: TypeSortBy) => void;

  colors: string[];
  toggleColor: (val: string) => void;

  sizes: TypeSize[];
  toggleSize: (val: TypeSize) => void;

  // Data after we apply filters
  query: TypeQueryData;
  applyFilters: () => void;
  resetFilters: () => void;
  setFilters: (data: { query: Partial<TypeQueryData>; page?: number }) => void;

  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;

  totalPages: number | null;
  setTotalPages: (val: number) => void;
}

const defaultQuery: TypeQueryData = {
  sortBy: 'newest',
  sizes: [],
  colors: [],
  price: {},
} as const;

export const useShopStore = create<IShopStore>((set) => ({
  colors: [...defaultQuery.colors],
  toggleColor: (color) =>
    set(({ colors }) => {
      if (colors.includes(color)) colors = colors.filter((el) => el !== color);
      else colors.push(color);
      return { colors };
    }),

  price: {},
  setPrice: (price) => set({ price }),

  sortBy: defaultQuery.sortBy,
  setSortBy: (sortBy) => {
    console.log('Sort by');
    set((state) => ({ sortBy, query: { ...state.query, sortBy } }));
  },
  setSortByDrawer: (sortBy) => set({ sortBy }),

  sizes: [...defaultQuery.sizes],
  toggleSize: (size) =>
    set(({ sizes }) => {
      if (sizes.includes(size)) sizes = sizes.filter((el) => el !== size);
      else sizes.push(size);
      return { sizes };
    }),

  page: 1,
  setPage: (page) => set({ page }),
  nextPage: () =>
    set((state) => {
      if (state.totalPages && state.totalPages < state.page + 1) return {};
      return { page: state.page + 1 };
    }),

  totalPages: null,
  setTotalPages: (totalPages) => set({ totalPages }),

  query: { ...defaultQuery },
  applyFilters: () =>
    set((state) => ({
      query: {
        sortBy: state.sortBy,
        sizes: [...state.sizes],
        colors: [...state.colors],
        price: { ...state.price },
      },
    })),
  resetFilters: () =>
    set({
      sortBy: defaultQuery.sortBy,
      colors: [...defaultQuery.colors],
      sizes: [...defaultQuery.sizes],
      price: { ...defaultQuery.price },
      query: { ...defaultQuery },
    }),
  setFilters: (data) => {
    if (!data) return;
    const { page, query } = data;

    set((state) => {
      const isCurrentFilterEqualToQuery = () => {
        const currentFilter: TypeQueryData = {
          sizes: [...state.query.sizes].sort(),
          colors: [...state.query.colors].sort(),
          sortBy: state.query.sortBy,
          price: {
            min: state.query.price?.min,
            max: state.query.price?.max,
          },
        };

        const queryToCompare = {
          sizes: query.sizes?.length
            ? query.sizes.sort()
            : defaultQuery.sizes.sort(),
          colors: query.colors?.length
            ? query.colors.sort()
            : defaultQuery.sizes.sort(),
          sortBy: query.sortBy ?? defaultQuery.sortBy,
          price: {
            min: query.price?.min ?? defaultQuery.price.min,
            max: query.price?.max ?? defaultQuery.price.max,
          },
        };

        return isEqual(currentFilter, queryToCompare);
      };

      return {
        ...(Object.keys(query).length > 0 &&
          !isCurrentFilterEqualToQuery() && {
            query: { ...state.query, ...query },
          }),
        ...((!!query.price?.min || !!query.price?.max) && {
          price: query.price,
        }),
        ...(!!query.sizes?.length && { sizes: [...query.sizes] }),
        ...(!!query.colors?.length && { colors: [...query.colors] }),
        ...(!!page && !isEqual(page, state.page) && { page }),
        ...(!!query.sortBy &&
          !isEqual(query.sortBy, state.sortBy) && { sortBy: query.sortBy }),
      };
    });
  },
}));
