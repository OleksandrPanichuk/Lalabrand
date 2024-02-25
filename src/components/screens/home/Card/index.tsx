'use client';
import { MouseEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/shared/navigation';
import { SvgIcon } from '@/components/common';
import css from './Card.module.scss';
import { useFavoriteStore } from '@/store';
import { useTranslations } from 'next-intl';

interface CardProps {
  item: Card;
  width: string;
  inFav?: Boolean;
}

type Card = {
  id: number;
  name: string;
  path: string;
  colors: string[];
  price: number;
};

export const Card = ({ item, width, inFav }: CardProps) => {
  const { id, name, path, colors, price } = item;

  const t = useTranslations();

  const [toDelete, setToDelete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [size, setSize] = useState(false);

  const { favorites, addFavorite, delFavorite } = useFavoriteStore();

  function changeFavoriteStatus(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (inFav) {
      setToDelete(false);
      setShowPopup(false);
    }
    if (favorites.includes(id)) {
      delFavorite(id);
      return;
    }
    addFavorite(id);
  }

  function remove(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setToDelete(true);
  }

  function popupToggle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPopup((prev) => !prev);
  }

  function chooseSize() {
    setSize(true);
  }

  function addToCart() {
    console.log('add to cart');
  }

  function stopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Link className={css.thumb} href={`/shop/${id}`}>
        <Image
          src={path}
          height={0}
          width={0}
          unoptimized
          style={{
            width,
            height: 'auto',
            filter: toDelete ? 'blur(2px)' : '',
            opacity: toDelete ? '0.8' : '1',
          }}
          alt={name}
        />
        <button
          type="button"
          onClick={inFav && !toDelete ? popupToggle : changeFavoriteStatus}
        >
          <SvgIcon
            name="like"
            width={26}
            height={26}
            fill={favorites.includes(id) ? '#950707' : 'transparent'}
            stroke={favorites.includes(id) ? '#950707' : '#4c4c4c'}
          />
        </button>
        {inFav && showPopup && !toDelete && (
          <>
            <div className={css.popup} onclick={stopPropagation}>
              <p>{t('Wishlist.Popup.Message')}</p>
              <button type="button" onClick={remove}>
                {t('Wishlist.Popup.Yes')}
              </button>
              <button type="button" onClick={popupToggle}>
                {t('Wishlist.Popup.No')}
              </button>
            </div>
            <div className={css.overlay} onClick={popupToggle}></div>
          </>
        )}
      </Link>
      <p className={css.bestseller_title}>{name}</p>
      {inFav && (
        <p className={css.colors}>
          <span>{t('Wishlist.Color')}:</span>
          <span
            style={{
              backgroundColor: `${colors[0]}`,
              border: colors[0] === 'white' ? '0.5px solid black' : '',
            }}
          ></span>
          <span>{colors[0]}</span>
        </p>
      )}
      {!inFav && (
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
      )}

      <p className={css.price}>${price}</p>
      {inFav && (
        <div className={css.btns}>
          <button type="button" onClick={chooseSize}>
            {t('Wishlist.Size')}
          </button>
          <button type="button" onClick={addToCart} disabled={!size}>
            <SvgIcon name="cart" width={24} height={24} fill={'#F3F2F2'} />
            {t('Wishlist.Add to bag')}
          </button>
        </div>
      )}
    </>
  );
};
