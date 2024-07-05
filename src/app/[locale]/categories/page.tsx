
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui';
import { cn } from '@/lib';
import { CategoriesPicker } from '@/features/categories';
import { Routes } from '@/shared/constants';
import styles from './page.module.scss';
import { CategoriesDisclosure } from '@/features/categories'

const Page =  () => {
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
