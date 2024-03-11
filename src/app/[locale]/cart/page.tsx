'use client';
import { Breadcrumbs, CartInfo, Title } from '@/components/common';
import { CartItem, ShippingFee } from '@/components/screens/cart';
import { Button } from '@/components/ui';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { useCartStore } from '@/store';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

const Page = () => {
  const t = useTranslations();
  const items = useCartStore((state) => state.items);

  //Items length to string
  const itemsLTS = items.length.toString();

  //Is Less than 10 and greater than 20
  const isLT10AGT20 = items.length <= 10 || items.length >= 20;

  return (
    <div className={cn('page__container', styles.container)}>
      <div className={styles.top}>
        <Breadcrumbs>
          <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
          <Breadcrumbs.Item href={Routes.CART}>cart</Breadcrumbs.Item>
        </Breadcrumbs>
        {items.length > 0 && (
          <span className={styles.count}>
            {itemsLTS.endsWith('1') && isLT10AGT20
              ? `${items.length} ` + t('Cart.Counter.One')
              : (itemsLTS.endsWith('3') ||
                    itemsLTS.endsWith('2') ||
                    itemsLTS.endsWith('4')) &&
                  isLT10AGT20
                ? `${items.length} ` + t('Cart.Counter.Plural')
                : `${items.length} ` + t('Cart.Counter.Other')}
          </span>
        )}
      </div>
      <section className={styles.content}>
        <Title
          name={t('Titles.Bag')}
          pronoun={t('Titles.Shopping')}
          className={styles.title}
        />
        {items.length > 0 ? (
          <div className={styles.grid}>
            <ShippingFee />
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem data={item} key={item.id} />
              ))}
            </div>
            <CartInfo />
          </div>
        ) : (
          <>
            <ShippingFee />
            <div className={styles.empty}>
              <h2>{t('Cart.Empty.Title')}</h2>
              <Button variant={'outline'} size={'lg'} asChild>
                <Link href={Routes.SHOP}>{t('Cart.Empty.Button')}</Link>
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
