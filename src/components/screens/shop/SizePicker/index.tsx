'use client';

import { useClickOutside, useDisclosure } from '@/hooks'
import { ElementRef, Fragment, useRef } from 'react'

import { SvgIcon } from '@/components/common'
import { Checkbox } from '@/components/ui'
import { cn } from '@/lib'
import { sizes as data } from '@/shared/constants'
import { useShopStore } from '@/store'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import styles from './SizePicker.module.scss'


export const SizePicker = () => {
  const t = useTranslations('Shop');


  const {sizes, toggleSize} = useShopStore(state => ({
    sizes: state.sizes,
    toggleSize: state.toggleSize
  }))

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
        {t('Size')}
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
          {data.map(size => (
            <label key={size}>
              <Checkbox checked={sizes.includes(size)} onChange={() => toggleSize(size)} />
              {size}
            </label>
          ))}
        </div>
      </Transition>
    </div>
  );
};
