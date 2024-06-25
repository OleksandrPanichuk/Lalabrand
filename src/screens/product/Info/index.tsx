'use client';
import { Rating } from '@/components/ui';
import { cn, formatCurrency } from '@/lib';
import { ImageSlider } from '@/screens/product';
import { TypeProductColor, TypeProductItem } from '@/shared/types';
import styles from './Info.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { colors } from '@/shared/constants';
import { Hint } from '@/components/common';

interface IInfoProps {
  data: TypeProductItem;
}

export const Info = ({ data }: IInfoProps) => {
  const t = useTranslations();

  const [color, setColor] = useState<TypeProductColor>(data.info[0].color);
  const images = data.info.find((el) => el.color === color)!.images;

  const productColors = data.info.map((el) => {
    return colors.find((colorsEl) => colorsEl.value === el.color)!;
  });

  const onColorChange = (newColor: TypeProductColor) => {
    const doesProductHasColor = data.info.some((el) => el.color === newColor);
    if (doesProductHasColor) {
      setColor(newColor);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ImageSlider key={color} images={images} />
      <div className={styles.info}>
        <div className={styles['info__top']}>
          <p className={styles.id}>{`art#${data.id}`}</p>
          <div className={styles.rating}>
            <Rating value={data.rating} color={'black'} />
            <div>
              {data.rating} ({Math.floor(data.rating)})
            </div>
          </div>
        </div>
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.price}>{formatCurrency(data.price)}</p>
        {/*  Color Picker*/}
        <div className={styles.colors}>
          <p className={styles.colors__current}>
            {t('Product.Color')}:{' '}
            {t(colors.find((el) => el.value === color)!.label)}
          </p>
          <ul className={styles.colors__list}>
            {productColors.map((el) => (
              <Hint asChild key={el.value} description={t(el.label)}>
                <li
                  className={cn(
                    styles.color,
                    color === el.value && styles['color--active'],
                  )}
                >
                  <div
                    style={{
                      backgroundColor: el.color,
                      borderColor:
                        el.value === 'WHITE'
                          ? 'var(--secondary-200)'
                          : el.color,
                    }}
                  >
                    {data.info.length > 1 && (
                      <input
                        type="radio"
                        name={`product-color`}
                        checked={el.value === color}
                        onChange={() => onColorChange(el.value)}
                      />
                    )}
                  </div>
                </li>
              </Hint>
            ))}
          </ul>
        </div>
        {/*  Size Picker*/}
      </div>
    </div>
  );
};
