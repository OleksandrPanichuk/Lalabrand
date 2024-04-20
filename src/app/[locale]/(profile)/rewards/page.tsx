'use client';
import { SvgIcon } from '@/components/common';
import { useAuth } from '@/components/providers';
import { copy, getUkrainianTranslation } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { orders } from './fakeData';
import styles from './page.module.scss';

const RewardsPage = () => {
  const t = useTranslations('Rewards');
  const { user } = useAuth();

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    if (+month < 10) {
      month = '0' + month;
    }

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.wrapper}>
      <h2>{t('Title')}</h2>
      <div className={styles.points}>
        <div>
          <h3>{user?.bonus ?? 0}</h3>
          <p>{t('Points.Available')}</p>
        </div>
        <hr />
        <div>
          {/* TODO: points expires functionality */}
          <h3>0</h3>
          <p>{t('Points.Expires')}</p>
        </div>
      </div>
      <section className={styles.details}>
        <h3>{t('Details.Title')}</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className={styles.order}>
              <header>
                <div
                  onClick={() => copy(order.id)}
                >
                  <h5>{t('Details.Order number')}</h5>
                  <SvgIcon name="copy" width={18} />
                  <span>{order.id}</span>
                </div>
                <div>
                  <h5>{t('Details.Order date')}</h5>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </header>
              <div>
                <ul className={styles['order__items']}>
                  {order.items.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <Image
                        src={item.image}
                        alt={`product-${item.id}`}
                        width={106}
                        height={140}
                      />
                    </li>
                  ))}
                </ul>
                <Link href={`${Routes.ORDERS}/${order.id}`}>
                  {t('Details.More')}
                  <SvgIcon name="arrow-right" width={42} />
                </Link>
                <p>
                  +
                  {getUkrainianTranslation(order.totalPrice, {
                    one: t('Details.Points.One'),
                    other: t('Details.Points.Other'),
                    plural: t('Details.Points.Plural'),
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RewardsPage;
