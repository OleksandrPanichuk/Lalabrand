'use client';
import { copy } from '@/lib';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

const ShippingInfoPage = () => {
  const t = useTranslations('Shipping Info');

  return (
    <div className={styles.wrapper}>
      <h2>{t('Title')}</h2>
      <div>
        <h5>{t('Processing Time.Title')}</h5>
        <p>{t('Processing Time.Text')}</p>
        <h5>{t('Shipping Rates.Title')}</h5>
        <p>{t('Shipping Rates.Text')}</p>
        <h5>{t('Shipping Methods.Title')}</h5>
        <pre>{t('Shipping Methods.Text')}</pre>
        <h5>{t('International Shipping.Title')}</h5>
        <p>
          {t('International Shipping.Text.1')}{' '}
          <span onClick={() => copy('contact@lalabrand.com')}>
            contact@lalabrand.com
          </span>{' '}
          {t('International Shipping.Text.2')}
        </p>
        <h5>{t('Order Tracking.Title')}</h5>
        <p>{t('Order Tracking.Text')}</p>
        <h5>{t('Shipping Restrictions.Title')}</h5>
        <p>{t('Shipping Restrictions.Text')}</p>
        <h5>{t('Contact Us.Title')}</h5>
        <p>
          {t('Contact Us.Text')}{' '}
          <span onClick={() => copy('contact@lalabrand.com')}>
            contact@lalabrand.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
