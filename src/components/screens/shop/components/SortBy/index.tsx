'use client';
import { SvgIcon } from '@/components/common';
import { Radio } from '@/components/ui';
import { cn } from '@/lib';
import { useShopStore } from '@/store';
import { useTranslations } from 'next-intl';
import { Picker } from '../Picker';
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

  return (
    <Picker
      className={cn(
        variant === 'default' && styles['wrapper--default'],
        styles.wrapper,
      )}
      withDefaultClassName={variant === 'drawer'}
    >
      {({ isOpen, close }) => (
        <>
          <Picker.Trigger
            withoutChevron={variant === 'default'}
            className={cn(isOpen && styles['trigger--open'])}
          >
            {variant === 'default' ? (
              <>
                <SvgIcon width={32} height={32} name="arrow-up-down" />
                {t('Label')}
              </>
            ) : (
              <>{t('Label')}</>
            )}
          </Picker.Trigger>

          <Picker.Content asChild>
            <ul
              role="listbox"
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
          </Picker.Content>
        </>
      )}
    </Picker>
  );
};
