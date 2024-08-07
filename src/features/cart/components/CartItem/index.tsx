'use client';
import { SvgIcon } from '@/components/common';
import { ConfirmModal } from '@/components/modals';
import { cn, formatCurrency } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { TypeCartItem } from '@/shared/types';
import { useFavoriteStore } from '@/store';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './CartItem.module.scss';
import { ColorSelect, SizeSelect } from './components';
import { useCartStore } from '@/features/cart'

interface ICartItemProps {
  data: TypeCartItem;
}

export const CartItem = ({ data }: ICartItemProps) => {
  const locale = useLocale();
  const increment = useCartStore((state) => state.incrementCount);
  const decrement = useCartStore((state) => state.decrementCount);
  const remove = useCartStore((state) => state.remove);
  const { toggleFavorite, favorites } = useFavoriteStore();

  const t = useTranslations('Cart.Item');

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image alt={`product-${data.name}`} src={data.imageUrl} fill />
      </div>
      <div className={styles.info}>
        <span className={styles.art}>art#{data.itemId}</span>
        <div className={styles.details}>
          <h4>
            <Link href={`${Routes.SHOP}/${data.itemId}`}>{data.name}</Link>
          </h4>
          <p>{formatCurrency(data.price, locale)}</p>
          <div>
            <ColorSelect
              active={data.color}
              colors={data.colors}
              id={data.id}
            />
            <SizeSelect active={data.size} sizes={data.sizes} id={data.id} />
            <div className={styles.amount}>
              <p>{t('Amount')}:</p>
              <div>
                <button onClick={() => decrement(data.id)}>
                  <SvgIcon name="minus" width={12} />
                </button>
                <span>{data.count}</span>
                <button onClick={() => increment(data.id)}>
                  <SvgIcon name="plus" width={12} height={12} />
                </button>
              </div>
            </div>
            <p className={styles.total}>
              <span>{t('Total')}:</span>
              <span>{formatCurrency(data.price * data.count, locale)}</span>
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={cn(
              favorites.includes(data.itemId) && styles['in-favorite'],
            )}
            onClick={() => toggleFavorite(data.itemId)}
          >
            <SvgIcon name="like" width={26} height={26} />
          </button>
          <ConfirmModal onConfirm={() => remove(data.id)}>
            <button
              className={styles.delete}
            >
              <SvgIcon name="trash" width={16} height={18} />
              {t('Delete')}
            </button>
          </ConfirmModal>
        </div>
      </div>
    </div>
  );
};
