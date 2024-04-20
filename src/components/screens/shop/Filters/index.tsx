'use client';
import { SvgIcon } from '@/components/common';
import { ColorPicker, DrawerButtons, SizePicker, SortBy } from '@/components/screens/shop';
import { Button } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { useShopStore } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import styles from './Filters.module.scss';

export const Filters = () => {
  const { open, close, isOpen } = useDisclosure();
  const t = useTranslations('Shop');

  

  return (
    <div className={styles.wrapper}>
      <SortBy variant="default" />

      {/* Filters Drawer */}
      <button className={styles.trigger} onClick={open}>
        <SvgIcon name="filters" width={33} height={33} />
        {t('Filters')}
      </button>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog className={'absolute w-full h-full z-[100]'} onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.overlay} />
          </Transition.Child>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed w-full max-w-[480px]"
                initial={{ right: '-30rem' }}
                animate={{ right: '0rem' }}
                exit={{ right: '-30rem', opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dialog.Panel className={styles.panel}>
                  <button onClick={close} className={styles.close}>
                    <SvgIcon name="close" width={16} height={16} />
                  </button>

                  <h2>{t('Filters & Sort')}</h2>

                  <div>
                    <SortBy variant="drawer" />
                    <SizePicker />
                    <ColorPicker />
                  </div>
                  <DrawerButtons />
                </Dialog.Panel>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog>
      </Transition>
    </div>
  );
};
