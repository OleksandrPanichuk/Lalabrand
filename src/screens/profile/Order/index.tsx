'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useConfirmModal } from '@/store';
import { SvgIcon } from '@/components/common';
import { Tracker } from '../Tracker';
import { copy } from '@/lib';
import { TypeOrder } from '@/shared/types';
import css from './Order.module.scss';
import { useState } from 'react';

interface OrderProps {
  order: TypeOrder;
}

export const Order = ({ order }: OrderProps) => {
  const {
    number,
    created_at,
    items,
    deliveryMethod,
    total_price,
    discount = 0,
    shipping_fee = 0,
    tax = 0,
    status = 'received',
  } = order;
  const t = useTranslations('My orders.Order');

  const email = 'dummy@test.com';
  const name = 'dummy name';

  const onOpen = useConfirmModal((state) => state.onOpen);
  const [isShowMoreDetail, setIsShowMoreDetail] = useState(false);

  const no = number?.toString() as string;

  function cancelHandler() {
    if (status === 'delivered') {
      console.log('send request for purchase return');
      return;
    }

    onOpen({
      buttonText: t('Confirm Modal.Button'),
      title: '',
      description: t('Confirm Modal.Description'),
      onConfirm: () => console.log('send request for the order cancelation'),
    });
  }

  function showMore() {
    setIsShowMoreDetail(!isShowMoreDetail);
  }

  function getPriceValue(): number {
    return total_price - shipping_fee + discount - tax;
  }

  return (
    <>
      <p className={css.orderNo} onClick={() => copy(no)}>
        {t('Order number')}{' '}
        <button type="button">
          <SvgIcon name="copy" fill="#222" width={18} height={18} />
        </button>{' '}
      </p>
      <p className={css.orderDate}> {t('Order date')}</p>
      <p className={css.no} onClick={() => copy(no)}>
        {no}
      </p>{' '}
      <p className={css.date}>{created_at.toString()}</p>
      <Tracker status={status} />
      <div
        className={css.imgContent}
        style={{
          backgroundColor: status === 'delivered' ? 'white' : 'inherit',
        }}
      >
        <ul>
          {items.slice(0, 3).map((el) => (
            <li key={el.id}>
              <Image
                src={el.image}
                height={140}
                width={106}
                unoptimized
                alt={el.title}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`${css.viewMore} ${isShowMoreDetail && css.more}`}
          onClick={() => showMore()}
        >
          {t('View')}
          {isShowMoreDetail ? t('less') : t('more')}{' '}
          <SvgIcon name="arrow-right" fill="#767676" width={46} height={16} />
        </button>
      </div>
      {isShowMoreDetail && (
        <ul className={css.itemList}>
          {items.map((el) => (
            <li key={el.image}></li>
          ))}
        </ul>
      )}
      {status === 'delivered' ? null : (
        <>
          <div className={css.details}>
            <h3>{t('My Details')}</h3>
            <p>{name}</p>
            <p>{email}</p>
            <h3>{t('Delivery method')}</h3>
            <p>{deliveryMethod}</p>
          </div>
          <div className={css.values}>
            <p>{t('Order value')}:</p>
            <p className={css.value}>${getPriceValue()}</p>
            <p>{t('Discounts')}:</p>
            <p className={css.value}>${discount.toFixed(2)}</p>
            <p>{t('Shipping fee')}:</p>{' '}
            <p className={css.value}>${shipping_fee}</p>
            <p>{t('Taxes')}:</p>
            <p className={css.value}>{tax ? `$${tax}` : '---'}</p>
            <div className={css.total}>
              <p>{t('Total')}:</p>
              <p>{total_price.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
      <button
        type="button"
        className={status === 'delivered' ? css.returnBtn : css.cancelBtn}
        onClick={() => cancelHandler()}
      >
        {status === 'delivered' ? t('Return purchase') : t('Cancel order')}
      </button>
    </>
  );
};
