'use client';

import { Logo } from '../Logo';

import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { useTranslations } from 'next-intl';
import { footerLinks, socialLinks } from './Footer.data';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import css from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslations();

  function onSubmit() {
    console.log('send');
  }
  return (
    <footer className={css.footer}>
      <div className={css.limiter}>
        <ul className={css.nav}>
          {footerLinks.map((el) => (
            <li key={Object.keys(el)[0]}>
              <h2>{Object.keys(el)[0]}</h2>
              <ul>
                {Object.values(el)[0].map(
                  (item: { href: string; key: string }) => (
                    <li key={item.key}>
                      <Link href={item.href}>{t(item.key)}</Link>
                    </li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ul>
        <div className={css.subscribe}>
          <h2>Subscribe to see more</h2>
          <p>Join now and get 10% off your next purchase!</p>
          <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" />
            <button type="submit">
              <SvgIcon name="arrow" width={43} height={16} />
            </button>
          </form>
        </div>
        <div className={css.logo}>
          <Logo />
          <p>© 2024</p>
        </div>
        <ul className={css.social}>
          {socialLinks.map((el) => (
            <li key={el}>
              <Link href={`www.${el}`}>
                <SvgIcon name={el} width={24} height={24} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
