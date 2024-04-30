import { CategoriesDisclosure } from '@/components/common'
import { Feed, Filters, Pagination } from '@/components/screens/shop'
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui'
import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { categories, clothTypes } from './page.data'
import styles from './page.module.scss'

interface IShopPageProps {
  searchParams: {
    category?: string;
    type?: string;
  };
}

const ShopPage = async ({ searchParams }: IShopPageProps) => {
  const { category, type: clothType } = searchParams;
  if (category && !categories.some((el) => el.value === category))
    return notFound();

  if (
    (clothType && !Object.keys(clothTypes).includes(clothType)) ||
    (clothType && !category)
  ) {
    return notFound();
  }

  const t = await getTranslations('');
  const activeCategory =
    categories.find((el) => el.value === category) ?? undefined;

  return (
    <div className={cn('page__container', styles.container)}>
      <Breadcrumbs>
        <BreadcrumbsItem href={Routes.ROOT}>lalabrand</BreadcrumbsItem>
        <BreadcrumbsItem href={Routes.SHOP}>shop</BreadcrumbsItem>
        {!!activeCategory && (
          <BreadcrumbsItem href={activeCategory.breadcrumb}>
            {activeCategory.value}
          </BreadcrumbsItem>
        )}
        {!!activeCategory && !!clothType && (
          <BreadcrumbsItem
            href={activeCategory.breadcrumb + `&type=${clothType}`}
          >
            {clothTypes[clothType]}
          </BreadcrumbsItem>
        )}
      </Breadcrumbs>
      <h1 className={styles.title}>
        {t(activeCategory ? activeCategory.label : 'Shop.Title')}
      </h1>
      <div className={styles.content}>
        <CategoriesDisclosure />
        <div>
          <Filters />
          <Feed />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
