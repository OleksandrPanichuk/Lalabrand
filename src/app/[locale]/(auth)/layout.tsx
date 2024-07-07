'use client';
import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { AuthAside, AuthForm } from '@/features/auth';
import { useResetPasswordStore } from '@/store';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import css from './layout.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const { status } = useResetPasswordStore();

  function getText(element: 'Title' | 'Undertitle'): string {
    if (status) {
      return `Auth.${element}.${status}`;
    }

    return `Auth.${element}.${page}`;
  }

  const page = pathname.includes('signin') ? 'signin' : 'signup';

  return (
    <div className={cn('page__container', css.container)}>
      <AuthAside />
      <div className={css.credentialsBox}>
        <h1>{t(getText('Title'))}</h1>
        <p>
          {t(getText('Undertitle'))}
          {status === 'checkEmail' && (
            <button
              type="button"
              onClick={() =>
                console.log('send to backend request for reset password')
              }
              className={css.resendBtn}
              title={t('Auth.Buttons.resend')}
            >
              {t('Auth.Buttons.resend')}
            </button>
          )}
        </p>

        <AuthForm />
        {/* the part below can be moved to the CredentialsForm component, but it will be hard to read */}
        {!status && children}
        {!status && (
          <>
            <span>{t('Auth.Text.or')}</span>
            <button
              type="button"
              onClick={() =>
                console.log('sign up or login with google account')
              }
              title={t('Auth.Buttons.Google')}
              className={css.loginViaSocial}
            >
              <SvgIcon name="google" width={20} height={20} />
              {t('Auth.Buttons.Google')}
            </button>
            <button
              type="button"
              onClick={() =>
                console.log('sign up or login with facebook account')
              }
              title={t('Auth.Buttons.Facebook')}
              className={css.loginViaSocial}
            >
              <SvgIcon
                name="facebook"
                width={24}
                height={24}
                fill={'#1877F2'}
              />
              {t('Auth.Buttons.Facebook')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
