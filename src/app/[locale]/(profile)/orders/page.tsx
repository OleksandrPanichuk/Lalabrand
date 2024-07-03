'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { currentOrders, pastOrders } from './orders.fakedata';
import { Order } from '@/screens/profile';
import css from './page.module.scss';
import { TypeOrder } from '@/shared/types';

const OrdersPage = () => {
  const pathname = usePathname();
  const t = useTranslations('My orders');
  //   const { user, setUser } = useAuth();
  const [showOrders, setShowOrders] = useState(false);

  function showMoreOrders(): void {
    if (Object.keys(pastOrders).length > 0) {
      setShowOrders((prev) => !prev);
      return;
    }
    setShowOrders(true);
  }

  return (
    <div className={css.wrapper}>
      <h2>{t('Title')}</h2>
      <ul>
        {currentOrders.map((el) => (
          <li
            key={el.number}
            className={css.orderGrid}
            style={{
              backgroundColor: pathname.includes('rewards')
                ? 'white'
                : 'inherit',
              padding: pathname.includes('rewards') ? '32px 24px' : '0',
            }}
          >
            <Order order={el} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => showMoreOrders()}>
        {showOrders ? t('Button.Hide') : t('Button.View')}{' '}
        {t('Button.past orders')}
      </button>
      {showOrders && (
        <ul>
          {pastOrders.map((el) => (
            <li key={el.number} className={css.orderGrid}>
              <Order order={el} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
