import { Routes } from '@/shared/constants'

export const categoryPreviewData: Record<
  CategoryType,
  {
    imageLeft: string;
    imageRight: string;
    key: string;
    link: string;
  }
> = {
  WOMEN: {
    imageLeft: '/images/home/categories/women-left.jpeg',
    imageRight: '/images/home/categories/women-right.jpeg',
    key: 'Home.Categories.Links.Women',
    link: Routes.SHOP_WOMEN,
  },
  MEN: {
    imageLeft: '/images/home/categories/men-left.jpeg',
    imageRight: '/images/home/categories/men-right.jpeg',
    key: 'Home.Categories.Links.Men',
    link: Routes.SHOP_MEN,
  },
  KIDS: {
    imageLeft: '/images/home/categories/kids-left.jpeg',
    imageRight: '/images/home/categories/kids-right.jpeg',
    key: 'Home.Categories.Links.Kids',
    link: Routes.SHOP_KIDS
  },
  ACCESSORIES: {
    imageLeft: '/images/home/categories/accessories-left.jpeg',
    imageRight: '/images/home/categories/accessories-right.jpeg',
    key: 'Home.Categories.Links.Accessories',
    link: Routes.SHOP_ACCESSORIES,
  },
  SALE: {
    imageLeft: '/images/home/categories/sale-left.jpeg',
    imageRight: '/images/home/categories/sale-right.jpeg',
    key: 'Home.Categories.Links.Sale',
    link: Routes.SALE,
  },
};

export type CategoryType = 'WOMEN' | 'MEN' | 'KIDS' | 'ACCESSORIES' | 'SALE';
