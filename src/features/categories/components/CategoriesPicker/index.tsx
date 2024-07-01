'use client';
import { LinkWithCircle, SvgIcon } from '@/components/common';
import { CategoryCard } from '@/features/categories';
import { Routes } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import styles from './CategoriesPicker.module.scss';

export const CategoriesPicker = () => {
  const t = useTranslations('Categories');
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <CategoryCard
          text="Women"
          src={'/images/categories/women.jpg'}
          alt="women"
          width={501}
          height={751}
          href={Routes.SHOP_WOMEN}
          align="horizontal"
        />
        <CategoryCard
          src={'/images/categories/men.jpg'}
          alt="men"
          width={395}
          height={751}
          text="Men"
          href={Routes.SHOP_MEN}
          align="horizontal"
        />
      </div>
      <div>
        <div className={styles.left}>
          <CategoryCard
            src={'/images/categories/kids.jpg'}
            alt="men"
            width={395}
            height={595}
            text="Kids"
            href={Routes.SHOP_KIDS}
          />
          <CategoryCard
            src={'/images/categories/sale.jpg'}
            alt="men"
            width={395}
            height={518}
            text="Sale"
            href={Routes.SALE}
          />
        </div>
        <div className={styles.right}>
          <CategoryCard
            src={'/images/categories/accessories.jpg'}
            alt="men"
            text="Accessories"
            width={501}
            height={656}
            href={Routes.SHOP_ACCESSORIES}
            noflex
          />
          <LinkWithCircle
            innerClassName={styles.button__inner}
            className={styles.button}
            href={Routes.SHOP}
          >
            {t('view more')}
            <SvgIcon name="arrow" width={42} />
          </LinkWithCircle>
        </div>
      </div>
    </div>
  );
};
