import { Routes } from "@/shared/constants"

export const categories = [
  {
    value: 'women',
    label: 'Categories.Women',
    breadcrumb: Routes.SHOP_WOMEN
  },
  {
    value: 'men',
    label: 'Categories.Men',
    breadcrumb: Routes.SHOP_MEN
  },
  {
    value: 'kids',
    label: 'Categories.Kids',
    breadcrumb: Routes.SHOP_KIDS
  },
  {
    value: 'accessories',
    label: 'Categories.Accessories',
    breadcrumb: Routes.SHOP_ACCESSORIES
  },
] satisfies { value: string; label: string, breadcrumb:string }[];

export const clothTypes = [
  'accessories',
  'blazers_vests',
  'cardigans_sweaters',
  'dresses',
  'jeans',
  'jackets_coats',
  'pants',
  'shirts_blouses',
  'shoes',
  'skirts',
  'shorts',
  'tops',
  'bags',
  'belts',
  'hairaccessories',
  'hats',
  'jewelry',
  'scarves',
  'sunglasses',
] satisfies string[];
