
import { CategoriesDisclosure } from '@/components/common';
import { CategoriesPicker } from '@/components/screens/categories';
import { Breadcrumbs } from '@/components/ui';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={cn('page__container', styles.container)}>
      <Breadcrumbs>
        <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
        <Breadcrumbs.Item href={Routes.CATEGORIES}>categories</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className={styles.content}>
        <CategoriesDisclosure />
        <CategoriesPicker />
      </div>
    </div>
  );
};

export default Page;
