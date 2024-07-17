import { Routes } from '@/shared/constants';
import { LucideIcon, Receipt, Settings, Trophy } from 'lucide-react';

type TypeLink = {
  href: string;
  icon: LucideIcon;
  text: string;
};

export const links: TypeLink[] = [
  {
    href: Routes.ORDERS,
    icon: Receipt,
    text: 'Orders',
  },
  {
    href: Routes.REWARDS,
    icon: Trophy,
    text: 'Rewards',
  },
  {
    href: Routes.SETTINGS,
    text: 'Settings',
    icon: Settings,
  },
];
