'use client';
import { SvgIcon } from '@/components/common';
import { Link } from '@/shared/navigation';
import css from '../layout.module.scss';
import { useTranslations } from 'next-intl';
import { resetForm } from '@/lib';

const Page = () => {
  const t = useTranslations();

  return (
    <>
      {/* the part below can be moved to the CredentialsForm component, but it will be hard to read */}
      <p className={css.medium}>
        {t('Auth.Text.have account')}
        <Link
          href={'/signin'}
          className={css.underline}
          onClick={() => resetForm('authForm')}
        >
          {t('Auth.Buttons.signin')}
        </Link>
      </p>
      <span>{t('Auth.Text.or')}</span>
      <button
        type="button"
        onClick={() => console.log('sign up with google account')}
        title={t('Auth.Buttons.Google')}
        className={css.loginViaSocial}
      >
        <SvgIcon name="google" width={20} height={20} />
        {t('Auth.Buttons.Google')}
      </button>
      <button
        type="button"
        onClick={() => console.log('sign up with facebook account')}
        title={t('Auth.Buttons.Facebook')}
        className={css.loginViaSocial}
      >
        <SvgIcon name="facebook" width={24} height={24} fill={'#1877F2'} />
        {t('Auth.Buttons.Facebook')}
      </button>
    </>
  );
};

export default Page;
