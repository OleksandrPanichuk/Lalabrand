'use client';

import { useClickOutside, useDebounce } from '@/hooks';
import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { SearchResults } from '..';

import { SvgIcon } from '@/components/common';
import styles from './SearchBarMobile.module.scss';

import { AnimatePresence, motion } from 'framer-motion';

export const SearchBarMobile = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchValue = useDebounce(searchValue);

  const t = useTranslations('Header.SearchBar');

  const popoverRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<HTMLFormElement>(null);

  useClickOutside([popoverRef, searchFieldRef], () => setOpen(false));

  useEffect(() => {
    setOpen(!!debouncedSearchValue);
  }, [debouncedSearchValue]);

  const onFocus = () => {
    if (debouncedSearchValue && !open) {
      setOpen(true);
    }
  };

  return (
    <>
      <button className={styles.trigger} onClick={() => setIsVisible(true)}>
        <SvgIcon name="search" aria-label="search" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              top: '-6.25rem',
            }}
            animate={{
              opacity: 1,
              top: '0px',
            }}
            exit={{
              top: '-100px',
            }}
            className={styles.container}
          >
            <div className={styles.wrapper}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className={styles.label}
                ref={searchFieldRef}
              >
                <SearchIcon />

                <label>
                  <input
                    onFocus={onFocus}
                    aria-label="search products"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t('Placeholder')}
                    className={styles.input}
                  />
                </label>
              </form>
              <button onClick={() => setIsVisible(false)}>
                <XIcon />
              </button>
            </div>

            <SearchResults
              ref={popoverRef}
              isOpen={open}
              resetSearchValue={() => {
                setSearchValue('');
                setIsVisible(false);
              }}
              searchValue={debouncedSearchValue}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
