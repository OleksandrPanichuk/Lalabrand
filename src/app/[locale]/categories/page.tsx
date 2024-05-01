
import { CategoriesDisclosure } from '@/components/common';
import { CategoriesPicker } from '@/screens/categories';
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={cn('page__container', styles.container)}>
      <Breadcrumbs>
        <BreadcrumbsItem href={Routes.ROOT}>lalabrand</BreadcrumbsItem>
        <BreadcrumbsItem href={Routes.CATEGORIES}>categories</BreadcrumbsItem>
      </Breadcrumbs>
      <div className={styles.content}>
        <CategoriesDisclosure />
        <CategoriesPicker />
      </div>
    </div>
  );
};

export default Page;
