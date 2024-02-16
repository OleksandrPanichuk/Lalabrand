'use client';

import Image from 'next/image';
import { Link } from '@/shared/navigation';
import { SvgIcon } from '@/components/common';
import css from './Card.module.scss';
import { useFavoriteStore } from '@/store/useFavoriteStore';

interface CardProps {
  item: Card;
}

type Card = {
  id: number;
  name: string;
  path: string;
  colors: string[];
  price: number;
};

export const Card = ({ item }: CardProps) => {
  const { id, name, path, colors, price } = item;

  const { favorites, addFavorite, delFavorite } = useFavoriteStore();

  function changeFavoriteStatus(e: MouseEvent) {
    e.preventDefault();
    if (favorites.includes(id)) {
      delFavorite(id);
      return;
    }
    addFavorite(id);
  }

  return (
    <>
      <Link className={css.thumb} href={`/shop/${id}`}>
        <Image
          src={path}
          height={0}
          width={0}
          unoptimized
          style={{ width: '288px', height: 'auto' }}
          alt={name}
        />
        <button type="button" onClick={(e) => changeFavoriteStatus(e)}>
          <SvgIcon
            name="like"
            width={26}
            height={26}
            fill={favorites.includes(id) ? '#950707' : 'transparent'}
            stroke={favorites.includes(id) ? '#950707' : '#4c4c4c'}
          />
        </button>
      </Link>
      <p className={css.bestseller_title}>{name}</p>
      <ul className={css.colors}>
        {colors.map((el) => (
          <li
            key={el}
            style={{
              backgroundColor: `${el}`,
              border: el === 'white' ? '0.5px solid black' : '',
            }}
          ></li>
        ))}
      </ul>
      <p className={css.price}>${price}</p>
    </>
  );
};
