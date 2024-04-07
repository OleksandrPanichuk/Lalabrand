'use client';
import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { useCartStore } from '@/store';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './ColorSelect.module.scss';
import { useTranslations } from 'next-intl'

interface IColorSelectProps {
  active: string;
  id: string;
  colors: string[];
}

export const ColorSelect = ({ active, colors, id }: IColorSelectProps) => {
  const updateColor = useCartStore((state) => state.updateColor);

  const chooseColor = (color: string) => {
    updateColor(id, color);
  };
  const otherColors = colors.filter((el) => el !== active);

  const t = useTranslations('Cart.Item')

  return (
    <Listbox onChange={chooseColor}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            styles.trigger,
            !otherColors.length && 'cursor-default',
          )}
        >
          {({ open }) => (
            <>
              <span>{t('Color')}:</span>
              <span
                style={{
                  backgroundColor: `${active}`,
                  border:
                    active.toLowerCase() === 'white' ? '0.5px solid black' : '',
                }}
              ></span>
              <span>{active}</span>
              {!!otherColors.length && (
                <SvgIcon
                  name={'chevron'}
                  width={10}
                  className={cn(
                    styles.chevron,
                    open && styles['chevron--open'],
                  )}
                />
              )}
            </>
          )}
        </Listbox.Button>
        {!!otherColors.length && (
          <Transition
            enter="transition-all  duration-200 ease-in-out"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100  scale-1"
            leave=" duration-200 transition-all ease-in-out"
            leaveFrom="opacity-100 scale-1"
            leaveTo="opacity-0 scale-0"
            as={Fragment}
          >
            <Listbox.Options className={styles.options}>
              {otherColors.map((color) => (
                <Listbox.Option
                  className={styles.option}
                  key={color}
                  value={color}
                >
                  <span
                    style={{
                      backgroundColor: `${color}`,
                      border:
                        color.toLowerCase() === 'white'
                          ? '0.5px solid black'
                          : '',
                    }}
                  ></span>
                  <span>{color}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        )}
      </div>
    </Listbox>
  );
};
