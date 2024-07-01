'use client';
import { TypeProductItem } from '@/shared/types';

import { Rating } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { formatUsername } from './Reviews.helpers';
import styles from './Reviews.module.scss';

interface IReviewsProps {
  data: TypeProductItem['reviews'];
}

export const Reviews = ({ data }: IReviewsProps) => {
  const t = useTranslations('Product.Reviews');

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{t('Title')}</h4>
      <ul className={styles.list}>
        {data.splice(0, 2).map((review) => (
          <li key={review.id} className={styles.review}>
            <div>
              <h5>{formatUsername(review.user)}</h5>
              <div className={styles.review__rating}>
                <Rating value={review.rating} />
                <p>{review.rating.toFixed(1)}</p>
              </div>
            </div>
            <p className={styles.review__text}>{review.text}</p>
          </li>
        ))}
      </ul>
      {/* TODO: either show modal with all reviews or navigate user to shop/[productId]/reviews page */}
      <button className={styles.more}>{t('Show more')}</button>
    </div>
  );
};
