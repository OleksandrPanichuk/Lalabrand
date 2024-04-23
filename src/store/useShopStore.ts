import { TypeSize, TypeSortBy } from '@/shared/types';
import { create } from 'zustand';

type TypeQueryData = {
  sortBy: TypeSortBy;
  sizes: TypeSize[];
  colors: string[];
};

interface IShopStore {
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
} as const;

export const useShopStore = create<IShopStore>((set) => ({
  colors: [...defaultQuery.colors],
  toggleColor: (color) =>
    set(({ colors }) => {
      if (colors.includes(color)) colors = colors.filter((el) => el !== color);
      else colors.push(color);
      return { colors };
    }),

  sortBy: defaultQuery.sortBy,
  setSortBy: (sortBy) =>
    set((state) => ({ sortBy, query: { ...state.query, sortBy } })),
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
  nextPage: () => set((state) => ({ page: state.page + 1 })),

  totalPages: null,
  setTotalPages: (totalPages) => set({ totalPages }),

  query: { ...defaultQuery },
  applyFilters: () =>
    set((state) => ({
      query: {
        sortBy: state.sortBy,
        sizes: [...state.sizes],
        colors: [...state.colors],
      },
    })),
  resetFilters: () =>
    set({
      sortBy: defaultQuery.sortBy,
      colors: [...defaultQuery.colors],
      sizes: [...defaultQuery.sizes],
      query: { ...defaultQuery },
    }),
}));
