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
        {t('Signup.Text.have account')}
        <Link
          href={'/signin'}
          className={css.underline}
          onClick={() => resetForm('authForm')}
        >
          {t('Signin.Buttons.Sign In')}
        </Link>
      </p>
      <span>{t('Signin.Text.or')}</span>
      <button
        type="button"
        onClick={() => console.log('sign up with google account')}
        title="Continue with Google"
        className={css.loginViaSocial}
      >
        <SvgIcon name="google" width={20} height={20} />
        {t('Signin.Buttons.Google')}
      </button>
      <button
        type="button"
        onClick={() => console.log('sign up with facebook account')}
        title="Continue with Facebook"
        className={css.loginViaSocial}
      >
        <SvgIcon name="facebook" width={24} height={24} fill={'#1877F2'} />
        {t('Signin.Buttons.Facebook')}
      </button>
    </>
  );
};

export default Page;
