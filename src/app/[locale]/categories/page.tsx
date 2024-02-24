'use client';
import { Breadcrumbs } from '@/components/common';
import {
  CategoriesDisclosure,
  CategoriesPicker,
} from '@/components/screens/categories';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={cn('page__container', styles.container)}>
      <Breadcrumbs>
        <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
        <Breadcrumbs.Item href={Routes.SHOP}>categories</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div>
            <h4>Offers & Deals</h4>
            <p>Big sale</p>
          </div>
          <CategoriesDisclosure />
        </aside>
        <CategoriesPicker />
      </div>
    </div>
  );
};

export default Page;
