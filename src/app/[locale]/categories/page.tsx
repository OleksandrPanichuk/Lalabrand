'use client';
import { Breadcrumbs } from '@/components/common';
import { CategoriesDisclosure, CategoriesPicker } from '@/screens/categories';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import styles from './page.module.scss';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('Categories');
  return (
    <div className={cn('page__container', styles.container)}>
      <Breadcrumbs>
        <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
        <Breadcrumbs.Item href={Routes.CATEGORIES}>categories</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div>
            <h4>{t('Offers_Deals')}</h4>
            <p>{t('Big Sale')}</p>
          </div>
          <CategoriesDisclosure />
        </aside>
        <CategoriesPicker />
      </div>
    </div>
  );
};

export default Page;
