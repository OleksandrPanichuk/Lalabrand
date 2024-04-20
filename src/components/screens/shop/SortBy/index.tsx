'use client';
import { SvgIcon } from '@/components/common';
import { Radio } from '@/components/ui';
import { useClickOutside, useDisclosure } from '@/hooks';
import { cn } from '@/lib';
import { useShopStore } from '@/store';
import { Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { ElementRef, Fragment, useRef } from 'react';
import { items } from './SortBy.data';
import styles from './SortBy.module.scss';

interface ISortByProps {
  variant: 'default' | 'drawer';
}

export const SortBy = ({ variant }: ISortByProps) => {
  const t = useTranslations('Shop.SortBy');

  const { sortBy, setSortBy, setSortByDrawer } = useShopStore((state) => ({
    sortBy: state.sortBy,
    setSortBy: state.setSortBy,
    setSortByDrawer: state.setSortByDrawer,
  }));

  const { close, toggle, isOpen } = useDisclosure();

  const selectRef = useRef<ElementRef<'ul'>>(null);
  const btnRef = useRef<ElementRef<'button'>>(null);

  useClickOutside([selectRef, btnRef], close);

  return (
    <div
      className={cn(
        variant === 'default'
          ? styles['wrapper--default']
          : styles['wrapper--drawer'],
        styles.wrapper,
      )}
    >
      <button
        ref={btnRef}
        onClick={toggle}
        className={cn(isOpen && styles['trigger--open'])}
      >
        {variant === 'default' ? (
          <>
            <SvgIcon width={32} height={32} name="arrow-up-down" />
            {t('Label')}
          </>
        ) : (
          <>
            {t('Label')}
            <SvgIcon name="chevron" width={10} />
          </>
        )}
      </button>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150 "
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ul
          role="listbox"
          ref={selectRef}
          className={cn(
            variant === 'default'
              ? styles['list--default']
              : styles['list--drawer'],
            styles.list,
          )}
        >
          {items.map((item) => (
            <li
              role="option"
              aria-selected={sortBy === item.value}
              key={item.value}
            >
              <label>
                <Radio
                  checked={item.value === sortBy}
                  onChange={() => {
                    if (variant === 'default') {
                      setSortBy(item.value);
                    } else {
                      setSortByDrawer(item.value);
                    }
                    close();
                  }}
                  name={`sort-by-${variant}`}
                />
                {t(item.label)}
              </label>
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};
