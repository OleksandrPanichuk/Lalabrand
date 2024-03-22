'use client';

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
        {t('Auth.Text.create account')}
        <Link
          href={'/signup'}
          className={css.underline}
          onClick={() => resetForm('authForm')}
        >
          {t('Auth.Buttons.signup')}
        </Link>
      </p>
    </>
  );
};

export default Page;
