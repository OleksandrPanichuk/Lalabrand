'use client';
import { SvgIcon } from '@/components/common';
import { Disclosure, Radio } from '@/components/ui';
import { useShopStore } from '@/features/shop';
import { useClickOutside, useDisclosure } from '@/hooks';
import { cn } from '@/lib';
import { Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { ElementRef, Fragment, useRef } from 'react';
import { items } from './SortBy.data';
import styles from './SortBy.module.scss';

interface ISortByProps {
  variant: 'default' | 'drawer';
}

export const SortBy = ({ variant }: ISortByProps) => {
  if (variant === 'drawer') {
    return <SortBy.Drawer />;
  }

  return <SortBy.Default />;
};

SortBy.Drawer = function DrawerSortBy() {
  const t = useTranslations('Shop.SortBy');

  const { sortBy, setSortByDrawer } = useShopStore((state) => ({
    sortBy: state.sortBy,
    setSortByDrawer: state.setSortByDrawer,
  }));

  return (
    <Disclosure>
      <Disclosure.Trigger>{t('Label')}</Disclosure.Trigger>
      <Disclosure.Content asChild>
        <ul role="listbox" className={cn(styles['list--drawer'], styles.list)}>
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
                    setSortByDrawer(item.value);
                    close();
                  }}
                  name={`sort-by-drawer`}
                />
                {t(item.label)}
              </label>
            </li>
          ))}
        </ul>
      </Disclosure.Content>
    </Disclosure>
  );
};

SortBy.Default = function DefaultSortBy() {
  const t = useTranslations('Shop.SortBy');

  const { sortBy, setSortBy } = useShopStore((state) => ({
    sortBy: state.sortBy,
    setSortBy: state.setSortBy,
  }));

  const { close, toggle, isOpen } = useDisclosure();
  const ref = useRef<ElementRef<'div'>>(null);

  useClickOutside([ref], () => close());

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        onClick={toggle}
        className={cn(isOpen && styles['trigger--open'])}
      >
        <SvgIcon width={32} height={32} name="arrow-up-down" />
        {t('Label')}
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
          className={cn(
            styles['list--default'],

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
                    setSortBy(item.value);
                    close();
                  }}
                  name={`sort-by-default`}
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
