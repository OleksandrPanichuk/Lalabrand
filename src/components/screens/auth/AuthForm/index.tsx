'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SvgIcon } from '@/components/common';
import css from './AuthForm.module.scss';
import { useTranslations } from 'next-intl';

type Data = {
  email: string;
  password: string;
  subscribe?: boolean;
};

export const AuthForm = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const [showpass, setShowpass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(true);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const email = target[0] as HTMLInputElement;
    const password = target[1] as HTMLInputElement;
    let subscribe;

    if (pathname.includes('signup')) {
      const confirmPassword = target[3] as HTMLInputElement;

      if (confirmPassword.value !== password.value) {
        setError(t('Signup.Errors.1'));
        return;
      }

      const agreement = target[5] as HTMLInputElement;
      if (!agreement.checked) {
        return;
      }

      subscribe = target[8] as HTMLInputElement;
    }

    const data: Data = { email: email.value, password: password.value };

    if (subscribe) {
      data.subscribe = subscribe.checked;
    }
    console.log('send to backend, wait for answer and redirect than', data);
    setError('');
    target.reset();
  }

  return (
    <form onSubmit={submitHandler} className={css.form}>
      <label>
        {t('Signin.Labels.Email')}

        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          required
        />
      </label>

      <div className={css.passwordDiv}>
        <label>
          {t('Signin.Labels.Password')}
          <input
            name="password"
            type={showpass ? 'text' : 'password'}
            pattern={
              pathname.includes('signup')
                ? '(?=.*d)(?=.*[a-z])(?=.*[@$!%*?&#^_-`])[A-Za-zd@$!%*?&#^_-`].{8,}'
                : undefined
            }
            required
          />
        </label>

        <button
          type="button"
          title="show password"
          onClick={() => setShowpass(!showpass)}
        >
          <SvgIcon
            name="showpass"
            width={24}
            height={24}
            fill={showpass ? '#950707' : '#4C4C4C'}
            stroke={showpass ? '#950707' : '#4C4C4C'}
          />
        </button>
        {pathname.includes('signup') && (
          <>
            <p> {t('Signup.Text.create password')}</p>
            <label>
              {t('Signup.Labels.Confirm password')}
              <input
                name="confirmPassword"
                type={showConfirmPass ? 'text' : 'password'}
                pattern="(?=.*d)(?=.*[a-z])(?=.*[@$!%*?&#^_-`])[A-Za-zd@$!%*?&#^_-`].{8,}"
                required
              />
            </label>
            <button
              type="button"
              title="show password"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className={css.showConfirm}
            >
              <SvgIcon
                name="showpass"
                width={24}
                height={24}
                fill={showConfirmPass ? '#950707' : '#4C4C4C'}
                stroke={showConfirmPass ? '#950707' : '#4C4C4C'}
              />
            </button>
          </>
        )}

        <div>
          <p className={css.error}>{error && error} &nbsp;</p>
          {pathname.includes('signin') && (
            <button
              type="button"
              onClick={() => console.log('call the forgot password protocol')}
              title="refresh password"
              className={css.refresh}
            >
              {t('Signin.Buttons.Forgot password')}
            </button>
          )}
        </div>
      </div>
      {pathname.includes('signup') && (
        <>
          <div className={css.checkbox}>
            <input name="agreeTerms" type="checkbox" required />
            <p>
              {t('Signup.Labels.Agree1')}
              <button
                type="button"
                onClick={() => console.log('show modal with Terms')}
                title="see terms"
              >
                {t('Signup.Buttons.Terms')}
              </button>
              {t('Signup.Labels.Agree2')}
              <button
                type="button"
                onClick={() => console.log('show modal with Privacy Policy')}
                title="see privacy policy"
              >
                {t('Signup.Buttons.Privacy')}
              </button>
            </p>
          </div>
          <label className={css.checkbox}>
            <input
              name="subscribe"
              type="checkbox"
              checked={subscribed}
              onChange={() => setSubscribed(!subscribed)}
            />
            {t('Signup.Labels.Subscribe')}
          </label>
        </>
      )}
      <button
        type="submit"
        onClick={() => false}
        title={pathname.includes('signin') ? 'sign in' : 'sign up'}
        className={css.dark_btn}
      >
        {t(
          pathname.includes('signup')
            ? 'Signin.Buttons.Sign Up'
            : 'Signin.Buttons.Sign In',
        )}
      </button>
    </form>
  );
};
