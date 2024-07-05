'use client';
import { Hint, SvgIcon } from '@/components/common'
import { SizeGuideModal } from '@/components/modals'
import { Button, Rating } from '@/components/ui'
import { ImageSlider, ProductDisclosures } from '@/features/product'
import { cn, formatCurrency } from '@/lib'
import { colors } from '@/shared/constants'
import { TypeProductColor, TypeProductItem, TypeSize } from '@/shared/types'
import { useFavoriteStore } from '@/store'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './Info.module.scss'

interface IInfoProps {
  data: TypeProductItem;
}

export const Info = ({ data }: IInfoProps) => {
  const t = useTranslations();

  const [color, setColor] = useState<TypeProductColor>(data.info[0].color);
  const [size, setSize] = useState<TypeSize>(data.sizes[0].value);

  const { toggleFavorite, favorites } = useFavoriteStore();

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

  const onSizeChange = (newSize: TypeSize) => {
    const doesProductHasSize = data.sizes.some((el) => el.value === newSize);
    if (doesProductHasSize) {
      setSize(newSize);
    }
  };

  return (
    <section className={styles.wrapper}>
      <ImageSlider key={color} images={images} />
      <div className={styles.info}>
        <div className={styles['info__top']}>
          <p className={styles.id}>{`art#${data.id}`}</p>
          <div className={styles.rating}>
            <Rating value={data.rating} />
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
        <div className={styles.sizes}>
          <div>
            <p className={styles.sizes__current}>
              {t('Product.Size')}: {size}
            </p>

            <SizeGuideModal>
              <button>
                <SvgIcon
                  name={'ruler'}
                  width={20}
                  height={16.48}
                  fill={'var(--text-color)'}
                />
                <span>{t('Product.Size Guide')}</span>
              </button>
            </SizeGuideModal>
          </div>

          <ul className={styles.sizes__list}>
            {data.sizes.map((el) => (
              <li
                key={el.id}
                className={cn(
                  styles.size,
                  size === el.value && styles['size--active'],
                )}
              >
                <span>{el.value.toUpperCase()}</span>
                {data.sizes.length > 1 && (
                  <input
                    name={'product-size'}
                    type={'radio'}
                    checked={el.value === size}
                    onChange={() => onSizeChange(el.value)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          {/* Add to favorites btn */}
          <Button
            size={'lg'}
            variant="outline"
            onClick={() => toggleFavorite(data.id)}
          >
            <SvgIcon
              name="like"
              width={26}
              height={26}
              fill={favorites.includes(data.id) ? '#950707' : 'transparent'}
              stroke={favorites.includes(data.id) ? '#950707' : '#4c4c4c'}
              className={
                favorites.includes(data.id) ? styles.chosen : undefined
              }
            />
          </Button>
          {/* Add to cart btn */}
          <Button size={'lg'}>
            <SvgIcon name="cart" fill="var(--secondary-000)" />
            <span>{t('Product.Add to cart')}</span>
          </Button>
        </div>
        {/* Disclosures: Description&Fit; Materials; Care Guide */}
        <ProductDisclosures data={data} />
      </div>
    </section>
  );
};
