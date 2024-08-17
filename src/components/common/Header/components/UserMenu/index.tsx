'use client';

import { SvgIcon } from '@/components/common/SvgIcon';
import { useAuth } from '@/components/providers';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { Menu, Transition } from '@headlessui/react';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { links } from './UserMenu.data';
import styles from './UserMenu.module.scss';

export const UserMenu = () => {
  const t = useTranslations('Header.UserMenu');
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <Link href={Routes.SIGN_IN}>
        <SvgIcon name="account" />
      </Link>
    );
  }

  return (
    <Menu as="div" className="relative flex">
      <Menu.Button>
        <SvgIcon name="account" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={styles.items}>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Menu.Item key={link.href}>
                {({ active }) => (
                  <Link
                    href={link.href}
                    className={cn(
                      styles.link,
                      active && styles['link--active'],
                    )}
                  >
                    <Icon className="size-5" />
                    <span className="text-md">{t(link.text)}</span>
                  </Link>
                )}
              </Menu.Item>
            );
          })}
          <hr className="my-1 h-px bg-zinc-200" />
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOut}
                className={cn(
                  styles.signOut,
                  active && styles['signOut--active'],
                )}
              >
                <LogOut className="size-5" />
                {t('Sign out')}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};