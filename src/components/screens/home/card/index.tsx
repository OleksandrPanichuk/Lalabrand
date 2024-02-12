'use client';

import { create } from 'zustand';
import Image from 'next/image';
import { Link } from '@/shared/navigation';
import { SvgIcon } from '@/components/common';
import css from './Card.module.scss';

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

// const useFavStore = create((set) => ({
//   isFav: false,
//   setFav: () => set((state) => ({ isFav: (state.isFav = !state.isFav) })),
//   fav: [],
//   addFav: (id: number) =>
//     set((state) => ({ fav: (state.fav = state.fav.push(id)) })),
// }));

export const Card = ({ item }: CardProps) => {
  const { id, name, path, colors, price } = item;
  // const isFav = useFavStore((state) => state.isFav);
  // const setFav = useFavStore((state) => state.setFav);
  // const fav = useFavStore((state) => state.fav);
  // const addFav = useFavStore((state) => state.addFav);
  const favorites: number[] = [];
  return (
    <>
      <Link className={css.thumb} href={`/shop/${id}`}>
        <Image src={path} width={288} height={432} alt={name} />
        <button type="button" onClick={() => console.log('addFav(id)')}>
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
