'use client';

import { SvgIcon } from '@/components/common';
import { Checkbox } from '@/components/ui';
import { useClickOutside, useDisclosure } from '@/hooks';
import { colors as data } from '@/shared/constants';
import { useShopStore } from '@/store';
import { Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { ElementRef, Fragment, useRef } from 'react';
import styles from './ColorPicker.module.scss';
import { cn } from '@/lib'

export const ColorPicker = () => {
  const t = useTranslations();

  const { colors, toggleColor } = useShopStore((state) => ({
    colors: state.colors,
    toggleColor: state.toggleColor,
  }));

  const { close, toggle, isOpen } = useDisclosure();

  const popoverRef = useRef<ElementRef<'div'>>(null);
  const btnRef = useRef<ElementRef<'button'>>(null);

  useClickOutside([popoverRef, btnRef], close);

  return (
    <div className={styles.wrapper}>
      <button
        ref={btnRef}
        onClick={toggle}
        className={cn(isOpen && styles['trigger--open'])}
      >
        {t('Shop.Color')}
        <SvgIcon name="chevron" width={10} />
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
        <div ref={popoverRef} className={styles.inner}>
          {data.map((el) => (
            <label key={el.value}>
              <Checkbox
                checked={colors.includes(el.value)}
                onChange={() => toggleColor(el.value)}
              />
              <span
                style={{
                  backgroundColor: el.color,
                  borderColor:
                    el.value === 'WHITE' ? 'var(--secondary-200)' : el.color,
                }}
              />
              {t(el.label)}
            </label>
          ))}
        </div>
      </Transition>
    </div>
  );
};
