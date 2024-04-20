import { Routes } from '@/shared/constants';
import { type TypeItem } from './CategoriesDisclosure.types';

export const womenData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getWUrl('accessories'),
    value:'accessories'
  },
  {
    key: getKey('Blazers_Vests'),
    href: getWUrl('blazers_vests'),
    value:'blazers_vests'
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getWUrl('cardigans_sweaters'),
    value:"cardigans_sweaters",
  },
  {
    key: getKey('Dresses'),
    href: getWUrl('dresses'),
    value:"dresses"
  },
  {
    key: getKey('Jeans'),
    href: getWUrl('jeans'),
    value:"jeans"
  },
  {
    key: getKey('Jackets_Coats'),
    href: getWUrl('jackets_coats'),
    value:"jackets_coats"
  },
  {
    key: getKey('Pants'),
    href: getWUrl('pants'),
    value:"pants"
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getWUrl('shirts_blouses'),
    value:"shirts_blouses"
  },
  {
    key: getKey('Shoes'),
    href: getWUrl('shoes'),
    value:"shoes"
  },
  {
    key: getKey('Skirts'),
    href: getWUrl('skirts'),
    value:"skirts"
  },
  {
    key: getKey('Shorts'),
    href: getWUrl('shorts'),
    value:"shorts"
  },
  {
    key: getKey('Tops'),
    href: getWUrl('tops'),
    value:"tops"
  },
];

export const menData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getMUrl('accessories'),
    value:'accessories'
  },
  {
    key: getKey('Blazers_Vests'),
    href: getMUrl('blazers_vests'),
    value:'blazers_vests'
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getMUrl('cardigans_sweaters'),
    value:"cardigans_sweaters"
  },
  {
    key: getKey('Dresses'),
    href: getMUrl('dresses'),
    value:"dresses"
  },
  {
    key: getKey('Jeans'),
    href: getMUrl('jeans'),
    value:"jeans"
  },
  {
    key: getKey('Jackets_Coats'),
    href: getMUrl('jackets_coats'),
    value:"jackets_coats"
  },
  {
    key: getKey('Pants'),
    href: getMUrl('pants'),
    value:"pants"
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getMUrl('shirts_blouses'),
    value:"shirts_blouses"
  },
  {
    key: getKey('Shoes'),
    href: getMUrl('shoes'),
    value:"shoes"
  },
  {
    key: getKey('Skirts'),
    href: getMUrl('skirts'),
    value:"skirts"
  },
  {
    key: getKey('Shorts'),
    href: getMUrl('shorts'),
    value:"shorts"
  },
];

export const kidsData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getKUrl('accessories'),
    value:'accessories'
  },
  {
    key: getKey('Blazers_Vests'),
    href: getKUrl('blazers_vests'),
    value:'blazers_vests'
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getKUrl('cardigans_sweaters'),
    value:'cardigans_sweaters'
  },
  {
    key: getKey('Dresses'),
    href: getKUrl('dresses'),
    value:"dresses"
  },
  {
    key: getKey('Jeans'),
    href: getKUrl('jeans'),
    value:'jeans'
  },
  {
    key: getKey('Jackets_Coats'),
    href: getKUrl('jackets_coats'),
    value:"jackets_coats"
  },
  {
    key: getKey('Pants'),
    href: getKUrl('pants'),
    value:'pants'
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getKUrl('shirts_blouses'),
    value:'shirts_blouses'
  },
  {
    key: getKey('Shoes'),
    href: getKUrl('shoes'),
    value:'skirts'
  },
  {
    key: getKey('Skirts'),
    href: getKUrl('skirts'),
    value:"skirts"
  },
  {
    key: getKey('Shorts'),
    href: getKUrl('shorts'),
    value:'shorts'
  },
];

export const accessoriesData: TypeItem[] = [
  {
    key: getKey('Bags'),
    href: getAUrl('bags'),
    value:'bags'
  },
  {
    key: getKey('Belts'),
    href: getAUrl('belts'),value:"belts"
  },
  {
    key: getKey('Hair Accessories'),
    href: getAUrl('hairaccessories'),
    value:'hairaccessories'
  },
  {
    key: getKey('Hats'),
    href: getAUrl('hats'),
    value:"hats"
  },
  {
    key: getKey('Jewelry'),
    href: getAUrl('jewelry'),
    value:"jewelry"
  },
  {
    key: getKey('Scarves'),
    href: getAUrl('scarves'),
    value:"scarves"
  },
  {
    key: getKey('Sunglasses'),
    href: getAUrl('sunglasses'),
    value:"sunglasses"
  },
];

// getWomenUrl
function getWUrl(type: string) {
  return `${Routes.SHOP_WOMEN}&type=${type}`;
}

// getMenUrl
function getMUrl(type: string) {
  return `${Routes.SHOP_MEN}&type=${type}`;
}

// getKidsUrl
function getKUrl(type: string) {
  return `${Routes.SHOP_KIDS}&type=${type}`;
}

// getAccessoriesUrl
function getAUrl(type: string) {
  return `${Routes.SHOP_ACCESSORIES}&type=${type}`;
}

function getKey(key: string) {
  return `Categories.Types.${key}`;
}
