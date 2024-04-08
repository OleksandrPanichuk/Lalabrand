'use client';

import { useTranslations } from 'next-intl';
import { TypeOrderStatus } from '@/shared/types';
import css from './Tracker.module.scss';

interface TrackerProps {
  status: TypeOrderStatus;
}

export const Tracker = ({ status }: TrackerProps) => {
  const t = useTranslations('My orders.Order.Tracker');

  const statuses = [
    'Order received',
    'Processed',
    'Shipped',
    'Delivered/Returned',
  ];

  function getIndex() {
    const index = statuses.findIndex((el) =>
      el.toLowerCase().includes(status.toLowerCase()),
    );

    return index;
  }

  return (
    <ul className={css.progress}>
      {statuses.map((el, index) => (
        <li key={el} className={index <= getIndex() ? css.done : css.wait}>
          <span>✔</span>
          <p>{t(el)}</p>
        </li>
      ))}
    </ul>
  );
};
