'use client';
import { SvgIcon } from '@/components/common';
import { formatCurrency } from '@/lib';
import { useCartStore } from '@/features/cart';
import { useTranslations } from 'next-intl';
import styles from './ShippingFee.module.scss';

export const ShippingFee = () => {
  const t = useTranslations('Cart.Shipping fee');
  const items = useCartStore((state) => state.items);
  const orderValue = items.reduce((acc, cur) => {
    acc += cur.price * cur.count;
    return acc;
  }, 0);

  return (
    <div className={styles.shipping}>
      <SvgIcon name="truck" width={32} height={22} fill="#222222" />
      <div>
        <h4>{t('Title')}</h4>
        {orderValue >= 40 ? (
          <p>{t('Free shipping')}</p>
        ) : (
          <p>
            {t('Text.1')}{' '}
            <span>
              {formatCurrency(
                +(orderValue >= 40 ? 0 : 40 - orderValue).toFixed(2),
              )}
            </span>{' '}
            {t('Text.2')}
          </p>
        )}
      </div>
    </div>
  );
};
