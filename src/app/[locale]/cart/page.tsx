'use client';
import {
  Breadcrumbs,
  CartItem,
  CheckoutInfo,
  Title,
} from '@/components/common';
import { ShippingFee } from '@/components/screens/cart';
import { Button } from '@/components/ui';
import { cn, getUkrainianTranslation } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { useCartStore } from '@/store';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

const Page = () => {
  const t = useTranslations();
  const items = useCartStore((state) => state.items);

  return (
    <div className={cn('page__container', styles.container)}>
      <div className={styles.top}>
        <Breadcrumbs>
          <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
          <Breadcrumbs.Item href={Routes.CART}>cart</Breadcrumbs.Item>
        </Breadcrumbs>
        {items.length > 0 && (
          <span className={styles.count}>
            {getUkrainianTranslation(items.length, {
              one: t('Cart.Counter.One'),
              plural: t('Cart.Counter.Plural'),
              other: t('Cart.Counter.Other'),
            })}
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
            <CheckoutInfo variant="cart" />
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
