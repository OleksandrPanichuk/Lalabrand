'use client';

import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { Montserrat_Alternates } from 'next/font/google';
import localFont from 'next/font/local';
import styles from './Logo.module.scss';

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['cyrillic', 'latin'],
});

const zaychik = localFont({
  src: '../../../../public/fonts/Zaychik-Regular.ttf',
  display: 'swap',
});

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      className={cn(styles.logo, montserratAlternates.className, className)}
      href={Routes.ROOT}
    >
      <span className={cn(zaychik.className, styles.accent)}>Lala</span>
      brand
    </Link>
  );
};
