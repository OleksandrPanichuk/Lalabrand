import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { useCartStore } from '@/store';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { sizesMap } from './SizeSelect.data';
import styles from './SizeSelect.module.scss';
import { useTranslations } from 'next-intl';

interface ISizeSelectProps {
  id: string;
  sizes: string[];
  active: string;
}
export const SizeSelect = ({ active, id, sizes }: ISizeSelectProps) => {
  const updateSize = useCartStore((state) => state.updateSize);

  const chooseSize = (size: string) => {
    updateSize(id, size);
  };
  const size = sizesMap.find((el) => el.value === active)!;

  const t = useTranslations('Cart.Item');

  return (
    <Listbox onChange={chooseSize}>
      <div className="relative">
        <Listbox.Button className={styles.trigger}>
          {({ open }) => (
            <>
              <span>{t('Size')}:</span>
              <span>{size.label}</span>
              <SvgIcon
                name={'chevron'}
                width={10}
                className={cn(styles.chevron, open && styles['chevron--open'])}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          enter="transition-all  duration-200 ease-in-out"
          enterFrom="opacity-0  scale-0"
          enterTo="opacity-100   scale-1"
          leave=" duration-200 transition-all ease-in-out"
          leaveFrom="opacity-100  scale-1"
          leaveTo="opacity-0 scale-0"
          as={Fragment}
        >
          <Listbox.Options className={styles.options}>
            {sizes
              .filter((val) => val !== active)
              .map((size) => (
                <Listbox.Option
                  className={styles.option}
                  key={size}
                  value={size}
                >
                  {sizesMap.find((el) => el.value === size)!.label}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
