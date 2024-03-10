'use client';

import { SignAside, CredentialsForm, SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { Link } from '@/shared/navigation';
import css from './page.module.scss';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();

  return (
    <div className={cn('page__container', css.container)}>
      <SignAside />
      <div className={css.credentialsBox}>
        <h1>{t('Signin.Title')}</h1>
        <p>{t('Signin.Text.undertitle')}</p>
        <CredentialsForm />
        {/* the part below can be moved to the CredentialsForm component, but it will be hard to read */}
        <p className={css.medium}>
          {t('Signin.Text.create account')}{' '}
          <Link href={'/signup'} className={css.underline}>
            {t('Signin.Buttons.Sign Up')}
          </Link>
        </p>

        <span>{t('Signin.Text.or')}</span>
        <button
          type="button"
          onClick={() => console.log('login with google account')}
          title="Continue with Google"
          className={css.loginViaSocial}
        >
          <SvgIcon name="google" width={20} height={20} />
          {t('Signin.Buttons.Google')}
        </button>
        <button
          type="button"
          onClick={() => console.log('login with facebook account')}
          title="Continue with Facebook"
          className={css.loginViaSocial}
        >
          <SvgIcon name="facebook" width={24} height={24} fill={'#1877F2'} />
          {t('Signin.Buttons.Facebook')}
        </button>
      </div>
    </div>
  );
};

export default Page;
