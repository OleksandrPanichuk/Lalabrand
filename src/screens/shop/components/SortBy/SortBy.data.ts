import { TypeSortBy } from "@/shared/types"

type TypeSortItem = {
  value: TypeSortBy;
  label: string;
};
export const items = [
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Recommended',
    value: 'recommended',
  },
  {
    label: 'Lowest price',
    value: 'price-lowest',
  },
  {
    label: 'Highest price',
    value: 'price-highest',
  },
] satisfies TypeSortItem[];
