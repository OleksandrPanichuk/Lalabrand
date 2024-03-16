'use client';
import { usePathname } from 'next/navigation';
import { AuthAside, AuthForm } from '@/components/screens/auth';
import { cn } from '@/lib';
import css from './layout.module.scss';
import { useTranslations } from 'next-intl';
import { useResetPasswordStore, Status } from '@/store';
import { Button } from '@/components/ui';

// interface TextObject {
//   title: string | { [key in Status]?: string };
//   undertitle?: string | { [key in Status]?: string };
// }

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
            >
              Click here to resend
            </button>
          )}
        </p>

        <AuthForm />
        {/* the part below can be moved to the CredentialsForm component, but it will be hard to read */}
        {!status && children}
      </div>
    </div>
  );
}
