'use client';
import { SvgIcon } from '@/components/common'
import { cn } from '@/lib'
import { Link } from '@/shared/navigation'
import { useCartStore, useFavoriteStore } from '@/store'
import { Listbox, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Fragment, MouseEvent, useState } from 'react'
import styles from '../Header/components/LanguageSelect/LanguageSelect.module.scss'
import css from './Card.module.scss'

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

// --- that should come from backend -----
const sizeOptions = [
  {
    label: 'XS',
    value: 'xs',
  },
  {
    label: 'S',
    value: 's',
  },
  {
    label: 'M',
    value: 'm',
  },
  {
    label: 'L',
    value: 'l',
  },
  {
    label: 'XL',
    value: 'xl',
  },
  {
    label: 'XXL',
    value: 'xxl',
  },
];
// -----------

export const Card = ({ item, width, inFav }: CardProps) => {
  const { id, name, path, colors, price } = item;

  const t = useTranslations();

  const [toDelete, setToDelete] = useState(false);

  const [size, setSize] = useState(t('Wishlist.Size'));

  const { favorites, addFavorite, delFavorite } = useFavoriteStore();
  const { add: addToBag, items: cartItems, incrementCount } = useCartStore();

  function changeFavoriteStatus(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (inFav) {
      setToDelete(true);
    }
    if (favorites.includes(id)) {
      delFavorite(id);
      return;
    }
    addFavorite(id);
    setToDelete(false);
  }

  // function remove(e: MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   setToDelete(true);
  // }

  function chooseSize(e: string) {
    setSize(e);
  }

  function addToCart() {
    const alreadyHas = cartItems.some(
      (item) =>
        item.itemId === id && item.size === size && item.color === colors[0],
    );
    if (alreadyHas) {
      return incrementCount({ id, size, color: colors[0] });
    }

    return addToBag({
      count: 1,
      imageUrl: item.path,
      name,
      price,
      size,
      itemId: id,
      id:Math.random(),
      colors: colors,
      color: colors[0],
      sizes: sizeOptions.map(opt => opt.value)
    });
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
        <button type="button" onClick={(e) => changeFavoriteStatus(e)}>
          <SvgIcon
            name="like"
            width={26}
            height={26}
            fill={favorites.includes(id) ? '#950707' : 'transparent'}
            stroke={favorites.includes(id) ? '#950707' : '#4c4c4c'}
            className={favorites.includes(id) ? `${css.choosen}` : undefined}
          />
        </button>
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
          <Listbox value={size} onChange={chooseSize}>
            <div className={'relative'}>
              <Listbox.Button className={styles.trigger}>
                {({ open, value }) => (
                  <>
                    {sizeOptions.find((opt) => opt.value === value)?.label ||
                      size}
                    <SvgIcon
                      name="chevron"
                      width={13}
                      height={13}
                      className={cn(
                        styles.chevron,
                        open && styles['chevron--open'],
                      )}
                    />
                  </>
                )}
              </Listbox.Button>
              <Transition
                enter="transition-opacity  duration-200 ease-in-out"
                enterFrom="opacity-0"
                enterTo="opacity-100 "
                leave=" duration-200 transition-opacity ease-in-out"
                leaveFrom="opacity-100 "
                leaveTo="opacity-0"
                as={Fragment}
              >
                <Listbox.Options className={styles.options}>
                  <hr className="h-[1px] bg-border" />
                  {sizeOptions.map((option, index) => (
                    <Fragment key={option.value}>
                      <Listbox.Option
                        className={styles.option}
                        value={option.value}
                      >
                        {({ selected }) => (
                          <span className={cn(selected && styles.selected)}>
                            {option.label}
                          </span>
                        )}
                      </Listbox.Option>

                      {index !== sizeOptions.length - 1 && (
                        <hr className="h-[1px] bg-border" />
                      )}
                    </Fragment>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <button
            type="button"
            onClick={addToCart}
            disabled={size === t('Wishlist.Size')}
          >
            <SvgIcon name="cart" width={24} height={24} fill={'#F3F2F2'} />
            {t('Wishlist.Add to bag')}
          </button>
        </div>
      )}
    </>
  );
};
