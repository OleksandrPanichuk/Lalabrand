import { Routes } from '@/shared/constants';

type TypeLink = {
  href: string;
  label: string;
};

const accountLinks: TypeLink[] = [
  {
    label: 'Links.Account.Orders',
    href: Routes.ORDERS,
  },
  {
    label: 'Links.Account.Settings',
    href: Routes.SETTINGS,
  },
  {
    label: 'Links.Account.Rewards',
    href: Routes.REWARDS,
  },
  {
    label: 'Links.Account.Wishlist',
    href: Routes.WISHLIST,
  },
];

const policyLinks: TypeLink[] = [
  {
    label: 'Links.Policy.Shipping info',
    href: Routes.SHIPPING_INFO,
  },
  {
    label: 'Links.Policy.Return policy',
    href: Routes.REFUND,
  },
  {
    label: 'Links.Policy.Privacy',
    href: Routes.LEGAL_PRIVACY,
  },
];

const helpLinks: TypeLink[] = [
  {
    label: 'Links.Help.Contact us',
    href: Routes.CONTACT,
  },
];

type TypeLinks = {
  heading: string;
  data: TypeLink[];
  id:number
};

export const links: TypeLinks[] = [
  {
    heading: 'Headings.Account',
    data: accountLinks,
    id:1
  },
  {
    heading: 'Headings.Policy',
    data:policyLinks,
    id:2
  },
  {
    heading:"Headings.Help",
    data:helpLinks,
    id:3
  }
];
