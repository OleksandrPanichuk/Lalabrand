'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SvgIcon } from '@/components/common';
import css from './AuthForm.module.scss';
import { useTranslations } from 'next-intl';
import { useResetPasswordStore } from '@/store';

type Data = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  subscribe?: boolean;
  agreeTerms?: string;
  verification?: number;
};

export const AuthForm = () => {
  const pathname = usePathname();
  const page = pathname.includes('signin') ? 'signin' : 'signup';
  const t = useTranslations();
  const { status, changeStatus } = useResetPasswordStore();
  const [showpass, setShowpass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(true);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    const form: Data = {};
    formData.forEach((value, key) => {
      // console.log(value, key);
      form[key] = value;
    });

    console.log(form);

    let subscribe = false;

    if (page === 'signup' || status === 'reset') {
      if (form.confirmPassword !== form.password) {
        setError(t('Auth.Errors.1'));
        return;
      } else {
        setError('');
      }

      if (page === 'signup') {
        // const agreement = target[5] as HTMLInputElement;
        if (!form.agreeTerms) {
          return;
        }

        subscribe = true;
      }
    }

    if (status === 'forgot') {
      console.log('send to backend request to reset password fot that email');
      changeStatus('checkEmail');
      return;
    }
    if (status === 'checkEmail') {
      changeStatus('verification');
      return;
    }
    if (status === 'verification') {
      console.log('send to backend verificaion code');
      changeStatus('reset');
      return;
    }
    if (status === 'reset') {
      console.log('send to backend new password');
      changeStatus('');
      return;
    }

    const { email, password } = form;
    const data: Data = { email, password };

    if (subscribe) {
      data.subscribe = true;
    }
    console.log('send to backend, wait for answer and redirect than', data);
    // setError('');
    target.reset();
  }

  return (
    <form
      onSubmit={submitHandler}
      className={css.form}
      id="authForm"
      style={{ marginBottom: status && '0' }}
    >
      {(!status || status === 'forgot') && (
        <label>
          {t('Auth.Labels.Email')}
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </label>
      )}
      {status === 'verification' && (
        <label>
          {t('Auth.Labels.Verification')}
          <input
            name="verification"
            type="text"
            placeholder={t('Auth.Text.verificationPlaceholder')}
            required
          />
        </label>
      )}
      {(!status || status === 'reset') && (
        <div className={css.passwordDiv}>
          <label>
            {t('Auth.Labels.Password')}
            <input
              name="password"
              type={showpass ? 'text' : 'password'}
              pattern={
                page === 'signup'
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
          {(page === 'signup' || status === 'reset') && (
            <>
              <p className={css.inputTip}> {t('Auth.Text.create password')}</p>
              <label>
                {t('Auth.Labels.Confirm password')}
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

          <p className={css.error}>{error && error} &nbsp;</p>
          {page === 'signin' && !status && (
            <button
              type="button"
              onClick={() => changeStatus('forgot')}
              title="reset password"
              className={css.refresh}
            >
              {t('Auth.Buttons.Forgot password')}
            </button>
          )}
        </div>
      )}

      {page === 'signup' && (
        <>
          <div className={css.checkbox}>
            <input name="agreeTerms" type="checkbox" required />
            <p>
              {t('Auth.Labels.Agree1')}
              <button
                type="button"
                onClick={() => console.log('show modal with Terms')}
                title="see terms"
              >
                {t('Auth.Buttons.Terms')}
              </button>
              {t('Auth.Labels.Agree2')}
              <button
                type="button"
                onClick={() => console.log('show modal with Privacy Policy')}
                title="see privacy policy"
              >
                {t('Auth.Buttons.Privacy')}
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
            {t('Auth.Labels.Subscribe')}
          </label>
        </>
      )}
      <button
        type="submit"
        onClick={() => false}
        title={t(status ? `Auth.Buttons.${page}` : `Auth.Buttons.${status}`)}
        className={status !== 'checkEmail' ? css.dark_btn : css.light_btn}
      >
        {t(status ? `Auth.Buttons.${status}` : `Auth.Buttons.${page}`)}
      </button>
    </form>
  );
};
