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

export const clothTypes: Record<string, string> = {
  'accessories' : 'accessories',
  'blazers_vests': 'blazers&vests',
  'cardigans_sweaters': 'cardigans&sweaters',
  'dresses' : 'dresses',
  'jeans' : 'jeans',
  'jackets_coats' :"jackets&coats",
  'pants' : 'pants',
  'shirts_blouses' : 'shirts&blouses',
  'shoes' : 'shoes',
  'skirts' : 'skirts',
  'shorts' : 'shorts',
  'tops' : 'tops',
  'bags' : 'bags',
  'belts' : 'belts',
  'hairaccessories' :'hairaccessories',
  'hats' :'hats',
  'jewelry' :'jewelry',
  'scarves' :'scarves',
  'sunglasses' :'sunglasses',
}
