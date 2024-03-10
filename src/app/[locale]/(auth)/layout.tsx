'use client';
import { usePathname } from 'next/navigation';
import { AuthAside, AuthForm } from '@/components/screens/auth';
import { cn } from '@/lib';
import css from './layout.module.scss';
import { useTranslations } from 'next-intl';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className={cn('page__container', css.container)}>
      <AuthAside />
      <div className={css.credentialsBox}>
        <h1>
          {pathname.includes('signup') ? t('Signup.Title') : t('Signin.Title')}
        </h1>
        <p>
          {pathname.includes('signup')
            ? t('Signup.Text.undertitle')
            : t('Signin.Text.undertitle')}
        </p>
        <AuthForm />
        {/* the part below can be moved to the CredentialsForm component, but it will be hard to read */}
        {children}
      </div>
    </div>
  );
}
