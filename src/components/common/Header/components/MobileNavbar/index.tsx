'use client';

import { Logo } from '@/components/common';
import { useDisclosure } from '@/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Fragment } from 'react';
import styles from './MobileNavbar.module.scss';
import { Navbar } from '..';

export const MobileNavbar = () => {
  const { open, isOpen, close } = useDisclosure();
  return (
    <>
      <button className={styles.trigger} onClick={open}>
        <MenuIcon />
      </button>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog className={'absolute w-full h-full z-[100000]'} onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out  duration-300"
            enterFrom=" left-[-17.5rem]"
            enterTo=" left-0"
            leave="ease-in  duration-200"
            leaveFrom="opacity-100 left-0"
            leaveTo="left-[-17.5rem] opacity-0"
          >
            <Dialog.Panel className={styles.panel}>
              <button onClick={close} className={styles.close}>
                <XIcon />
              </button>
              <Logo />
              <Navbar className={styles.navbar} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
