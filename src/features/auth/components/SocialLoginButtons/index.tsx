'use client';

import { SvgIcon } from '@/components/common';
import { useTranslations } from 'next-intl';

import styles from './SocialLoginButtons.module.scss';

export const SocialLoginButtons = () => {
  const t = useTranslations('Auth');
  return (
    <div className={styles.wrapper}>
      <div className={styles.or}>
        <span>{t('Text.or')}</span>
      </div>
      <button
        className={styles.button}
        onClick={() => console.log('sign up or login with google account')}
        title={t('Buttons.Google')}
      >
        <SvgIcon name="google" width={20} height={20} />
        {t('Buttons.Google')}
      </button>
      <button
        onClick={() => console.log('sign up or login with facebook account')}
        title={t('Buttons.Facebook')}
        className={styles.button}
      >
        <SvgIcon name="facebook" fill={'#1877F2'} />
        {t('Buttons.Facebook')}
      </button>
    </div>
  );
};
