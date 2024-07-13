'use client';

import { SvgIcon } from '@/components/common/SvgIcon'
import { useAuth } from '@/components/providers'
import { Routes } from '@/shared/constants'
import { Link } from '@/shared/navigation'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { links } from './UserMenu.data'
import styles from './UserMenu.module.scss'
// PREVIOUS UI PACKAGE VERSION ^1.7.18

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
    <Menu>
      <MenuButton>
        <SvgIcon name="account" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        transition
        className={styles.items}
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <MenuItem key={link.href}>
              <Link
                href={link.href}
                className={styles.link}
              >
                <Icon className="size-5" />
                <span className="text-md">{t(link.text)}</span>
              </Link>
            </MenuItem>
          );
        })}
        <hr className="my-1 h-px bg-zinc-200" />
        <MenuItem>
          <button
            onClick={signOut}
            className={styles.signOut}
          >
            <LogOut className="size-5" />
            {t('Sign out')}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
