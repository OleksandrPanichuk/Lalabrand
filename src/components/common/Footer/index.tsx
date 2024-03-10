'use client';

import { Logo, SvgIcon } from '@/components/common';
import { Link } from '@/shared/navigation';
import { useTranslations } from 'next-intl';
import { footerLinks, socialLinks, column } from './Footer.data';
import css from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslations();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    console.log('send', { email: input.value });

    target.reset();
  }
  return (
    <footer className={css.footer}>
      <div className={css.limiter}>
        <ul className={css.nav}>
          {footerLinks.map((el, index) => (
            <li key={index}>
              <h3>{Object.keys(column[index])[0]}</h3>
              <ul>
                {el.map((item: { href: string; key: string }) => (
                  <li key={item.key}>
                    <Link href={item.href}>{t(item.key)}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className={css.subscribe}>
          <h3>{t('Footer.Titles.Get more deals')}</h3>
          <p>{t('Footer.Text.Subscribe')}</p>
          <form onSubmit={onSubmit}>
            <label>
              {t('Footer.Titles.Email')}
              <input
                name="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </label>

            <button
              className={css.subscribeBtn}
              type="submit"
              onClick={() => false}
            >
              {t('Footer.Buttons.Join')}
              <SvgIcon name={'arrow'} width={48} height={16} />
            </button>
          </form>
        </div>
        <div className={css.logo}>
          <Logo />
          <p>
            {t('Footer.Policy.Text')}{' '}
            <Link href="https://www2.hm.com/en_us/index.html">{t('Footer.Policy.Link')}</Link>
          </p>
        </div>
        <ul className={css.social}>
          {socialLinks.map((el) => (
            <li key={el}>
              <Link
                href={`https://www.${el}.com/lalabrand`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon name={el} width={24} height={24} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
