'use client';
import { Breadcrumbs, CheckoutInfo, Title } from '@/components/common';
import {
  Info,
  OrderPreview,
  PaymentMethodPicker,
  ShippingPicker,
} from '@/components/screens/checkout';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { useCartStore } from '@/store';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';

const Page = () => {
  const t = useTranslations();
  const items = useCartStore((state) => state.items);

  // if (!items.length) notFound();

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
          <Breadcrumbs.Item href={Routes.CHECKOUT}>checkout</Breadcrumbs.Item>
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
        <div>
          <div>
            <OrderPreview />
            <ShippingPicker />
            <PaymentMethodPicker />
          </div>
          <Info />
        </div>
      </section>
    </div>
  );
};

export default Page;
