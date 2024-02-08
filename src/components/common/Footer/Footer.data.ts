import { Routes } from '@/shared/constants';

export const column = [
  { Shop: 'Footer.Titles.Shop' },
  { About: 'Footer.Titles.About' },
  { Help: 'Footer.Titles.Help' },
];

export const footerLinks = [
  [
    {
      href: Routes.SHOP_WOMEN,
      key: 'Header.Links.Women',
    },
    {
      href: Routes.SHOP_MEN,
      key: 'Header.Links.Men',
    },
    {
      href: Routes.SHOP_KIDS,
      key: 'Header.Links.Kids',
    },
    {
      href: Routes.SHOP_ACCESSORIES,
      key: 'Header.Links.Accessories',
    },
    {
      href: Routes.SALE,
      key: 'Header.Links.Sale',
    },
  ],

  [
    {
      href: Routes.ABOUT_US,
      key: 'Footer.Links.About us',
    },
    {
      href: Routes.GIFT_CARDS,
      key: 'Footer.Links.Gift cards',
    },
    {
      href: Routes.CAREER,
      key: 'Footer.Links.Career',
    },
    {
      href: Routes.LOCATIONS,
      key: 'Footer.Links.Locations',
    },
  ],
  [
    {
      href: Routes.ACCOUNT,
      key: 'Footer.Links.My account',
    },
    {
      href: Routes.TRACK_ORDER,
      key: 'Footer.Links.Track my order',
    },
    {
      href: Routes.REFUND,
      key: 'Footer.Links.Return and replace',
    },
    {
      href: Routes.CUSTOMER_SERVICE,
      key: 'Footer.Links.Customer Service',
    },
    {
      href: Routes.LEGAL_PRIVACY,
      key: 'Footer.Links.Legal & Privacy',
    },
    {
      href: Routes.CONTACT,
      key: 'Footer.Links.Contact',
    },
  ],
];

export const socialLinks = ['facebook', 'instagram', 'tik-tok'];
