'use client';
import { SvgIcon } from '@/components/common';
import { useResetPasswordStore } from '@/store';
import { gql, useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './AuthForm.module.scss';

type Data = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  subscribe?: boolean;
  agreeTerms?: string;
  verification?: number;
};

const REGISTER = gql`
  mutation User($userInput: UserInput!) {
    user(userInput: $userInput) {
      id
      email
    }
  }
`;

export const AuthForm = () => {
  const pathname = usePathname();
  const page = pathname.includes('signin') ? 'signin' : 'signup';
  const t = useTranslations();
  const { status, changeStatus } = useResetPasswordStore();
  const [showpass, setShowpass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(true);
  const [isSubmmitBtnActive, setIsSubmmitBtnActive] = useState(false);

  const [user, { error: err, data: credential }] = useMutation(REGISTER);

  useEffect(() => {
    if (isSubmmitBtnActive) {
      setIsSubmmitBtnActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, pathname, setIsSubmmitBtnActive]);

  function isValidPassword(str: string) {
    return (
      str.length > 7 &&
      /[a-zA-Z]/.test(str) &&
      /\d/.test(str) &&
      /[@$!%*?&]/.test(str)
    );
  }

  function submitHandler(e: React.FormEvent | InputEvent) {
    e.preventDefault();

    const target = document.getElementById('authForm') as HTMLFormElement;

    const formData = new FormData(target);

    const isValueEmpty = !target.checkValidity();

    let isPassValid = true;
    let isConfirmPassValid = true;

    const form: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      form[key as keyof Data] = value;
      if (
        (e.type === 'submit' && (page === 'signup' || status)) ||
        (e.type === 'change' && (!isPasswordValid || !isConfirmPasswordValid))
      ) {
        if (key === 'password') {
          isPassValid = isValidPassword(value.toString());
          setIsPasswordValid(isPassValid);
        }
        if (key === 'confirmPassword') {
          isPassValid = isValidPassword(value.toString());
          setIsConfirmPasswordValid(isPassValid);
        }
      }
    });

    setIsSubmmitBtnActive(!isValueEmpty);

    if (isValueEmpty) {
      return;
    }

    let subscribe = false;

    if (page === 'signup' || status === 'reset') {
      if (form.confirmPassword !== form.password) {
        setError(t('Auth.Errors.1'));
        setIsSubmmitBtnActive(false);
        return;
      } else {
        setError('');
      }
    }

    if (!isPassValid || !isConfirmPassValid) {
      return;
    }

    if (e.type === 'change') {
      return;
    }

    if (page === 'signup') {
      if (!form.agreeTerms) {
        return;
      }

      subscribe = true;
    }

    if (status === 'forgot') {
      console.log('send to backend request to reset password fot that email');
      changeStatus('checkEmail');
      return;
    }
    if (status === 'checkEmail') {
      console.log('send to backend verificaion code');
      changeStatus('reset');
      return;
    }
    if (status === 'reset') {
      console.log('send to backend new password');
      changeStatus('');
      target.reset();
      return;
    }

    const { email, password } = form;
    const data: Data = { email, password };

    if (subscribe) {
      data.subscribe = true;
    }

    console.log('send to backend, wait for answer and redirect than', data);

    user({
      variables: {
        userInput: {
          password: 'Testpass8!',
          email: 'test4@i.ua',
        },
      },
    });
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
            onChange={(e) => submitHandler(e)}
            required
          />
        </label>
      )}
      {status === 'checkEmail' && (
        <label>
          {t('Auth.Labels.Verification')}
          <input
            name="verification"
            type="text"
            placeholder={t('Auth.Text.verificationPlaceholder')}
            onChange={(e) => submitHandler(e)}
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
              onChange={(e) => submitHandler(e)}
              className={isPasswordValid ? '' : 'errorField'}
              style={{
                border: isPasswordValid
                  ? '1px solid #c8c8c8'
                  : '1px solid #e10d0d',
              }}
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
              <p
                className={css.inputTip}
                style={{
                  color: isPasswordValid ? '#a1a1a1' : '#e10d0d',
                }}
              >
                {' '}
                {t('Auth.Text.create password')}
              </p>
              <label>
                {t('Auth.Labels.Confirm password')}
                <input
                  name="confirmPassword"
                  type={showConfirmPass ? 'text' : 'password'}
                  onChange={(e) => submitHandler(e)}
                  style={{
                    border: isConfirmPasswordValid
                      ? '1px solid #c8c8c8'
                      : '1px solid #e10d0d',
                  }}
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
              onClick={() => {
                changeStatus('forgot');
                setIsSubmmitBtnActive(false);
              }}
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
        onClick={() => {
          user({
            variables: {
              userInput: {
                password: 'Testpass8!',
                email: 'test4@i.ua',
              },
            },
          });
        }}
        title={t(status ? `Auth.Buttons.${status}` : `Auth.Buttons.${page}`)}
        className={css.dark_btn}
        data-active={isSubmmitBtnActive}
      >
        {t(status ? `Auth.Buttons.${status}` : `Auth.Buttons.${page}`)}
      </button>
      {status === 'checkEmail' && (
        <button
          type="submit"
          onClick={() => changeStatus('')}
          title={t(`Auth.Buttons.${status}`)}
          className={css.light_btn}
        >
          {t(`Auth.Buttons.backToSignin`)}
        </button>
      )}
    </form>
  );
};
