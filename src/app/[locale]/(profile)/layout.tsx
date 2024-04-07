'use client';
import { useAuth } from '@/components/providers';
import { cn, getUkrainianTranslation } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link, redirect, usePathname } from '@/shared/navigation';
import { useTranslations } from 'next-intl';
import { Fragment, PropsWithChildren } from 'react';
import { links } from './layout.data';
import styles from './layout.module.scss';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const t = useTranslations('Profile.Sidebar');

  if (!user) return redirect(Routes.SIGN_IN);

  return (
    <div className={cn(styles.wrapper, 'page__container')}>
      <aside>
        <h1>Hi, {user.username}</h1>
        <div className={styles.bonus}>
          <p>
            {getUkrainianTranslation(user.bonus ?? 0, {
              one: t('Bonus.Points.One'),
              other: t('Bonus.Points.Other'),
              plural: t('Bonus.Points.Plural'),
            })}
          </p>
          <p>{t('Bonus.Text')}</p>
        </div>

        <nav>
          {links.map((group) => (
            <Fragment key={group.id}>
              <h3>{t(group.heading)}</h3>

              <ul>
                {group.data.map((link) => (
                  <li
                    key={link.href}
                    className={cn(
                      pathname.includes(link.href) && styles.active,
                    )}
                  >
                    <Link href={link.href}>{t(link.label)}</Link>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </nav>

        <button onClick={signOut}>{t('Sign Out')}</button>
      </aside>
      <>{children}</>
    </div>
  );
};

export default ProfileLayout;
