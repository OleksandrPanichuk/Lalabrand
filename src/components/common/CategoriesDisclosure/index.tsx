'use client';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link, usePathname } from '@/shared/navigation';
import { Disclosure } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  accessoriesData,
  kidsData,
  menData,
  womenData,
} from './CategoriesDisclosure.data';
import styles from './CategoriesDisclosure.module.scss';
import { ICategoriesDisclosureItemProps } from './CategoriesDisclosure.types';

export const CategoriesDisclosure = () => {
  const t = useTranslations('Categories');
  return (
    <aside className={styles.sidebar}>
      <div>
        <h4>{t('Offers_Deals')}</h4>
        <p>{t('Big Sale')}</p>
      </div>
      <div className={styles.wrapper}>
        <Item group="women" href={Routes.SHOP_WOMEN} data={womenData}>
          {t('Women')}
        </Item>
        <Item group="men" href={Routes.SHOP_MEN} data={menData}>
          {t('Men')}
        </Item>
        <Item group="kids" href={Routes.SHOP_KIDS} data={kidsData}>
          {t('Kids')}
        </Item>
        <Item
          group="accessories"
          href={Routes.SHOP_ACCESSORIES}
          data={accessoriesData}
        >
          {t('Accessories')}
        </Item>
      </div>
    </aside>
  );
};

const Item = ({
  data,
  href,
  children,
  group,
}: ICategoriesDisclosureItemProps) => {
  const t = useTranslations('');
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get('type');
  const activeCategory = searchParams.get('category');

  const active =
    pathname === Routes.SHOP && group === activeCategory ? type ?? 'all' : null;

  return (
    <Disclosure defaultOpen={activeCategory === group} className={styles.item} as="div">
      <Disclosure.Button className={styles.button}>
        {({ open }) => {
          return (
            <>
              {children}
              <SvgIcon
                fill="black"
                width={12}
                height={12}
                className={cn(styles.arrow, open && styles['arrow--rotated'])}
                name="arrow-top-right"
              />
            </>
          );
        }}
      </Disclosure.Button>
      <Disclosure.Panel as="ul" className={styles.list}>
        <li>
          <Link href={href} className={cn(active === 'all' && styles['link--red'])}>
            {t('Categories.View all')}
          </Link>
        </li>
        {data.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={cn(active === item.value && styles['link--red'])}
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </Disclosure.Panel>
    </Disclosure>
  );
};
