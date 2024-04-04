'use client';
import { Breadcrumbs, Title } from '@/components/common';
import {
  Info,
  OrderPreview,
  PaymentMethodPicker,
  ShippingPicker,
} from '@/components/screens/checkout';
import { cn, getUkrainianTranslation } from '@/lib';
import { Routes } from '@/shared/constants';
import { useCartStore } from '@/store';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

const Page = () => {
  const t = useTranslations();
  const items = useCartStore((state) => state.items);

  if (!items.length) notFound();

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
            {getUkrainianTranslation(items.length, {
              one: t('Cart.Counter.One'),
              plural: t('Cart.Counter.Plural'),
              other: t('Cart.Counter.Other'),
            })}
          </span>
        )}
      </div>
      <div className={styles.content}>
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
      </div>
    </div>
  );
};

export default Page;
