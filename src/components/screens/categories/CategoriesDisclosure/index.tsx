'use client';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { Disclosure } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import {
  accessoriesData,
  kidsData,
  menData,
  womenData,
} from './CategoriesDisclosure.data';
import styles from './CategoriesDisclosure.module.scss';
import { ICategoryDisclosureItemProps } from './CategoriesDisclosure.types';

export const CategoriesDisclosure = () => {
  const t = useTranslations('Categories');
  return (
    <div className={styles.wrapper}>
      <Item href={Routes.SHOP_WOMEN} data={womenData}>
        {t('Women')}
      </Item>
      <Item href={Routes.SHOP_MEN} data={menData}>
        {t('Men')}
      </Item>
      <Item href={Routes.SHOP_KIDS} data={kidsData}>
        {t('Kids')}
      </Item>
      <Item href={Routes.SHOP_ACCESSORIES} data={accessoriesData}>
        {t('Accessories')}
      </Item>
    </div>
  );
};

const Item = ({ data, href, children }: ICategoryDisclosureItemProps) => {
  const t = useTranslations('');

  return (
    <Disclosure className={styles.item} as="div">
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
      <Disclosure.Panel as="ul"  className={styles.list}>
        <li>
          <Link href={href} className={styles['link--red']}>
            {t('Categories.View all')}
          </Link>
        </li>
        {data.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>{t(item.key)}</Link>
          </li>
        ))}
      </Disclosure.Panel>
    </Disclosure>
  );
};
