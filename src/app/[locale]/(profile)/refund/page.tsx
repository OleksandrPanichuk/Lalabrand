'use client';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';
import { copy } from '@/lib'

const RefundsPage = () => {
  const t = useTranslations('Refund');
  return (
    <div className={styles.wrapper}>
      <h2>{t('Title')}</h2>
      <div>
        <h5>{t('Return Policy.Title')}</h5>
        
        <p>{t('Return Policy.Text')}</p>
       
        <h5>{t('Returns.Title')}</h5>
       
        <p>{t('Returns.Text')}</p>
       
        <h5>{t('Refunds.Title')}</h5>
      
        <p>{t('Refunds.Text')}</p>
       
        <h5>{t('Shipping.Title')}</h5>
        
        <p>{t('Shipping.Text')}</p>
      
        <h5>{t('Contact.Title')}</h5>
        
        <p>
          {t('Contact.Text')}{' '}
          <span
            onClick={() => copy('contact@lalabrand.com')}
          >
            contact@lalabrand.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default RefundsPage;
