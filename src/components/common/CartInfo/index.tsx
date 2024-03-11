'use client';
import { useAuth } from '@/components/providers';
import { Button, Input } from '@/components/ui';
import { formatCurrency } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { useCartStore } from '@/store';
import { useLocale, useTranslations } from 'next-intl';
import { FormEvent } from 'react';
import styles from './CartInfo.module.scss';

export const CartInfo = () => {
  const t = useTranslations('Cart Info');
  const items = useCartStore((state) => state.items);
  const { user } = useAuth();
  const locale = useLocale();

  const applyPromocode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const applyPoints = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const orderValue = items.reduce((acc, cur) => {
    acc += cur.price * cur.count;
    return acc;
  }, 0);

  
  const getShippingFee = () => {
    if(orderValue >= 40) return 0
    const base = Math.ceil((orderValue * 15) / 100);
    
    return base > 1 ? base - 0.01 : base;
  };
  //TODO: calculate discount
  const discount = 0;

  const total = discount + getShippingFee() + orderValue;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={applyPromocode} className={styles.promocode}>
        <Input placeholder={t('Promocode')} />
        <Button type="submit" variant={'gray'} size={'sm'}>
          {t('Apply')}
        </Button>
      </form>
      {user ? (
        <form onSubmit={applyPoints} className={styles.points}>
          <p>{t('Points.Label')}</p>
          <div>
            <Input placeholder={t('Points.Placeholder')} />
            <Button type="submit" variant={'gray'} size={'sm'}>
              {t('Apply')}
            </Button>
          </div>
          {/* TODO:Show available points from db */}
          <p>{t('Points.Available')}: 60</p>
        </form>
      ) : (
        <div className={styles['sign-in']}>
          <p>{t('Log In Message')}</p>
          <Button asChild variant={'outline'} size={'lg'}>
            <Link href={Routes.SIGN_IN}>{t('Log In')}</Link>
          </Button>
        </div>
      )}

      <ul className={styles['payment-info']}>
        <li>
          {t('Order value')}:<span>{formatCurrency(orderValue, locale)}</span>
        </li>
        <li>
          {t('Discounts')}:<span>{formatCurrency(discount, locale)}</span>
        </li>
        <li>
          {t('Shipping fee')}:
          <span>{formatCurrency(getShippingFee(), locale)}</span>
        </li>
        <li>
          {t('Taxes')}:<span>---</span>
        </li>
      </ul>
      <hr className={styles.divider} />
      <p className={styles.total}>
        {t('Total')}:<span>{formatCurrency(total, locale)}</span>
      </p>
      <Button
        className={styles.continue}
        variant={'outline'}
        size={'lg'}
        asChild
      >
        <Link href={Routes.SHOP}>{t('Continue')}</Link>
      </Button>
      <Button asChild size={'lg'}>
        <Link href={Routes.CHECKOUT}>{t('Checkout')}</Link>
      </Button>
    </div>
  );
};
