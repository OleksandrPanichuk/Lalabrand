'use client';

import { Rating } from '@/components/ui';
import { TypeProductItem } from '@/shared/types';
import { useTranslations } from 'next-intl';

import styles from './CustomerOpinions.module.scss';

interface ICustomerOpinionsProps {
  rating: number;
  data: TypeProductItem['customerOpinions'];
}

export const CustomerOpinions = ({ data, rating }: ICustomerOpinionsProps) => {
  const t = useTranslations("Product.Customer's opinions");
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{t('Title')}</h4>
      <div className={styles.rating}>
        <Rating
          value={rating}
          fillColor="var(--primary-500)"
          starHeight={20}
          starWidth={20}
        />
        <p>
          {rating} {t('out of')} 5
        </p>
      </div>
      <div className={styles.info}>
        <h5>{t('What customers say')}</h5>
        <p>{data.description}</p>
      </div>
      <ul className={styles.tags}>
        {data.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};
