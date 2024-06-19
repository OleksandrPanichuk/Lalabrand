import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui';
import { Info } from '@/screens/product';
import { Routes } from '@/shared/constants';
import { TypeProductItem } from '@/shared/types';
import { categories, clothTypes } from '../page.data';
import { fakeProductData } from './page.data';
import styles from './page.module.scss'
import { cn } from '@/lib'

interface IProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: IProductPageProps) {
  const data: TypeProductItem = fakeProductData;
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

        {/*  Style with(Looks)*/}
        <div></div>
        {/*  You may also like*/}
        <div></div>
      </div>
    </div>
  );
}
