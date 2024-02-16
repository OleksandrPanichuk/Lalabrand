'use client';
import { LinkWithCircle, SvgIcon } from '@/components/common';
import { ImageSlider } from '@/components/screens/home';
import { Routes } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.scss';

export const Hero = () => {
  const t = useTranslations('Home.Hero');

  return (
    <section className={styles.hero}>
      <div className={styles['left-side']}>
        <h1 className={styles.title}>
          <span>
            {t('Title.1')} <span>{t('Title.2')}</span>{' '}
          </span>
          <span>{t('Title.3')}</span>
        </h1>
        <p className={styles.text}>{t('Text')}</p>
        <LinkWithCircle
          href={Routes.CATEGORIES}
          className={styles.button}
          innerClassName={styles.button__inner}
        >
          {t('Button')}
          <SvgIcon name="arrow" width={42} />
        </LinkWithCircle>
      </div>
      <div className={styles['right-side']}>
        <ImageSlider />
      </div>
    </section>
  );
};
