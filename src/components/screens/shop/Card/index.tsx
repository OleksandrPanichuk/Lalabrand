'use client';
import { Hint, SvgIcon } from '@/components/common';
import { TypeShopItem } from '@/shared/types';
import { useFavoriteStore } from '@/store';
import { useState } from 'react';

import { cn, formatCurrency } from '@/lib';
import { Routes, colors } from '@/shared/constants';
import { Link, useRouter } from '@/shared/navigation';
import { Variants, motion } from 'framer-motion';
import styles from './Card.module.scss';
import { useTranslations } from 'next-intl'

interface ICardProps {
  data: TypeShopItem;
}

function isInFavorite(id: string) {
  return useFavoriteStore.getState().favorites.includes(id);
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    top: '100%',
  },
  hover: {
    top: 'calc(100% - 50px)',
    opacity: 1,
  },
};

export const Card = ({ data }: ICardProps) => {
  const t = useTranslations()
  const [inFavorite, setInFavorite] = useState<boolean>(isInFavorite(data.id));
  const [selectedColor, setSelectedColor] = useState<
    TypeShopItem['info'][0] | null
  >(null);

  const router = useRouter();
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const navigate = () => {
    router.push(`${Routes.SHOP}/${data.id}`);
  };

  const onFavorite = () => {
    setInFavorite((prev) => !prev);
    toggleFavorite(data.id);
  };

  return (
    <article className={styles.wrapper}>
      <motion.div initial="hidden" whileHover={'hover'}>
        <motion.img
          key={!selectedColor ? data.image : selectedColor.image}
          className={styles.image}
          transition={{ duration: 1 }}
          initial={{
            filter: 'blur(5px)',
          }}
          animate={{ filter: 'blur(0)' }}
          src={!selectedColor ? data.image : selectedColor.image}
          alt={data.title}
          onClick={navigate}
        />
        <button type="button" onClick={onFavorite}>
          <SvgIcon
            name="like"
            width={24}
            height={24}
            fill={inFavorite ? 'var(--pr' : 'transparent'}
            className={inFavorite ? `${styles.chosen}` : undefined}
          />
        </button>
        <motion.ul
          transition={{ duration: 0.3 }}
          className={styles.sizes}
          variants={variants}
        >
          {data.sizes.map((size) => (
            <li key={size.id}>{size.value}</li>
          ))}
        </motion.ul>
      </motion.div>

      <h3 className={styles.name}>
        <Link href={`${Routes.SHOP}/${data.id}`}>{data.title}</Link>
      </h3>
      <ul className={styles.colors}>
        {data.info.map((el) => {
          const colorInfo =
            colors.find((item) => item.value === el.color)!
            
          const active = el.id === selectedColor?.id;

          return (
            <Hint key={el.id} description={t(colorInfo.label)} side='top' >
              <li
                
                className={cn(
                  styles.color,
                  data.info.length > 1 && styles['color--possible-change'],
                  active && styles['color--active'],
                )}
                style={{
                  backgroundColor: colorInfo.color,
                  borderColor:
                    el.color === 'WHITE' ? 'var(--secondary-200)' : colorInfo.color,
                }}
              >
                {data.info.length > 1 && (
                  <input
                    type="checkbox"
                    name={`color-${data.id}`}
                    checked={active}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        return setSelectedColor(null);
                      }
                      setSelectedColor(el);
                    }}
                  />
                )}
              </li>
            </Hint>
          );
        })}
      </ul>
      <p className={styles.price}>{formatCurrency(data.price)}</p>
    </article>
  );
};
