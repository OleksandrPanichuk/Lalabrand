import { Card } from '@/components/common';
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui';
import { CustomerOpinions, Info, Reviews } from '@/features/product';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { TypeProductItem } from '@/shared/types';
import { getTranslations } from 'next-intl/server';
import { categories, clothTypes } from '../page.data';
import { fakeProductData, fakeSimilarProductsData, fakeStyleWithData } from './page.data';
import styles from './page.module.scss';

interface IProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: IProductPageProps) {
  const t = await getTranslations('Product');

  const data: TypeProductItem = fakeProductData;
  const looks = fakeStyleWithData;
  const similarProducts = fakeSimilarProductsData

  // Приблизний вигляд запиту
  // const apolloClient = getClient()
  // const {} = await apolloClient.query({
  //   query:PRODUCT_BY_ID_QUERY,
  //   variables: params
  // })

  const activeCategory = categories.find((el) => el.value === data.category)!;

  return (
    <div className={cn('page__container', styles.container)}>
      {/*  Breadcrumbs */}
      <Breadcrumbs>
        <BreadcrumbsItem href={Routes.ROOT}>lalabrand</BreadcrumbsItem>

        <BreadcrumbsItem href={activeCategory.breadcrumb}>
          {activeCategory.value}
        </BreadcrumbsItem>

        <BreadcrumbsItem
          href={activeCategory.breadcrumb + `&type=${data.type}`}
        >
          {clothTypes[data.type]}
        </BreadcrumbsItem>
        <BreadcrumbsItem href={Routes.SHOP + `/${data.id}`}>
          {data.name}
        </BreadcrumbsItem>
      </Breadcrumbs>

      <div>
        {/*  Product info */}
        <Info data={data} />

        {/*Reviews & Opinions*/}
        <section className={styles['opinions-reviews']}>
          <CustomerOpinions rating={data.rating} data={data.customerOpinions} />
          <hr />
          <Reviews data={data.reviews} />
        </section>

        {/*  Style with(Looks)*/}
        <section className={styles.looks}>
          <h2>
            {t('Style with.1')} <span>{t('Style with.2')}</span>
          </h2>
          <ul>
            {looks.map((look) => (
              <li key={look.id}>
                <Card item={look} width="18rem" />
              </li>
            ))}
          </ul>
        </section>
        {/*  You may also like*/}
        <section className={styles['similar-products']}>
          <h2>
            {t('You may also like.1')} <span>{t('You may also like.2')}</span>
          </h2>
          <ul>
            {similarProducts.map((item) => (
              <li key={item.id}>
                <Card item={item} width="18rem" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
