import { Routes } from '@/shared/constants';
import { type TypeItem } from './CategoriesDisclosure.types';

export const womenData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getWUrl('accessories'),
  },
  {
    key: getKey('Blazers_Vests'),
    href: getWUrl('blazers_vests'),
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getWUrl('cardigans_sweaters'),
  },
  {
    key: getKey('Dresses'),
    href: getWUrl('dresses'),
  },
  {
    key: getKey('Jeans'),
    href: getWUrl('jeans'),
  },
  {
    key: getKey('Jackets_Coats'),
    href: getWUrl('jackets_coats'),
  },
  {
    key: getKey('Pants'),
    href: getWUrl('pants'),
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getWUrl('shirts_blouses'),
  },
  {
    key: getKey('Shoes'),
    href: getWUrl('shoes'),
  },
  {
    key: getKey('Skirts'),
    href: getWUrl('skirts'),
  },
  {
    key: getKey('Shorts'),
    href: getWUrl('shorts'),
  },
  {
    key: getKey('Tops'),
    href: getWUrl('tops'),
  },
];

export const menData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getMUrl('accessories'),
  },
  {
    key: getKey('Blazers_Vests'),
    href: getMUrl('blazers_vests'),
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getMUrl('cardigans_sweaters'),
  },
  {
    key: getKey('Dresses'),
    href: getMUrl('dresses'),
  },
  {
    key: getKey('Jeans'),
    href: getMUrl('jeans'),
  },
  {
    key: getKey('Jackets_Coats'),
    href: getMUrl('jackets_coats'),
  },
  {
    key: getKey('Pants'),
    href: getMUrl('pants'),
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getMUrl('shirts_blouses'),
  },
  {
    key: getKey('Shoes'),
    href: getMUrl('shoes'),
  },
  {
    key: getKey('Skirts'),
    href: getMUrl('skirts'),
  },
  {
    key: getKey('Shorts'),
    href: getMUrl('shorts'),
  },
];

export const kidsData: TypeItem[] = [
  {
    key: getKey('Accessories'),
    href: getKUrl('accessories'),
  },
  {
    key: getKey('Blazers_Vests'),
    href: getKUrl('blazers_vests'),
  },
  {
    key: getKey('Cardigans_Sweaters'),
    href: getKUrl('cardigans_sweaters'),
  },
  {
    key: getKey('Dresses'),
    href: getKUrl('dresses'),
  },
  {
    key: getKey('Jeans'),
    href: getKUrl('jeans'),
  },
  {
    key: getKey('Jackets_Coats'),
    href: getKUrl('jackets_coats'),
  },
  {
    key: getKey('Pants'),
    href: getKUrl('pants'),
  },
  {
    key: getKey('Shirts_Blouses'),
    href: getKUrl('shirts_blouses'),
  },
  {
    key: getKey('Shoes'),
    href: getKUrl('shoes'),
  },
  {
    key: getKey('Skirts'),
    href: getKUrl('skirts'),
  },
  {
    key: getKey('Shorts'),
    href: getKUrl('shorts'),
  },
];

export const accessoriesData: TypeItem[] = [
  {
    key: getKey('Bags'),
    href: getAUrl('bags'),
  },
  {
    key: getKey('Belts'),
    href: getAUrl('belts'),
  },
  {
    key: getKey('Hair Accessories'),
    href: getAUrl('hairaccessories'),
  },
  {
    key: getKey('Hats'),
    href: getAUrl('hats'),
  },
  {
    key: getKey('Jewelry'),
    href: getAUrl('jewelry'),
  },
  {
    key: getKey('Scarves'),
    href: getAUrl('scarves'),
  },
  {
    key: getKey('Sunglasses'),
    href: getAUrl('sunglasses'),
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
  return `Categories.Links.${key}`;
}
