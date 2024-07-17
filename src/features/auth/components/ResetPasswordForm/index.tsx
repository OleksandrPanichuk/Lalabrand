'use client';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import {
  isValidPassword,
  resetPasswordFormSchema,
  ResetPasswordFormValues,
  useResetPassword,
  useSendResetPassCode,
} from '@/features/auth';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link, useRouter } from '@/shared/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import styles from './ResetPasswordForm.module.scss';

export const ResetPasswordForm = () => {
  const t = useTranslations('Auth');

  const [email, setEmail] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const emailFromStorage = sessionStorage.getItem('lalabrand:email');
    if (!emailFromStorage) {
      router.push(Routes.FORGOT_PASSWORD);
    } else {
      setEmail(emailFromStorage);
    }
  }, [router]);

  const [resendToken] = useSendResetPassCode({
    onCompleted: () => toast.success(t('Toasts.Check email')),
  });
  const [resetPassword, { loading }] = useResetPassword({
    onCompleted: () => router.push(Routes.SIGN_IN),
  });

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'onChange',
  });

  const [status, setStatus] = useState<'verification' | 'creation'>(
    'verification',
  );

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = form;

  const handlePasswordBlur = () => {
    const { password, confirmPassword } = getValues();
    if (!confirmPassword || !password) return;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('Password.No match'),
      });
    } else {
      clearErrors('confirmPassword');
    }
  };

  const onSubmit = ({ token, password }: ResetPasswordFormValues) => {
    if (!email) {
      return;
    }

    return resetPassword({
      password,
      token,
      email,
    });
  };

  const onResend = () => {
    if (email) {
      resendToken({
        email,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={cn(status !== 'verification' && 'hidden')}>
          <h1 className={styles.title}>{t('Title.checkEmail')}</h1>
          <p className={styles.undertitle}>
            {t('Undertitle.checkEmail')}
            <button
              onClick={onResend}
              type="button"
              className={styles.resendBtn}
            >
              {t('Buttons.resend')}
            </button>
          </p>
          <FormField
            control={control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel size="base">{t('Labels.Verification')}</FormLabel>
                <FormControl>
                  <Input {...field} size="lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={styles.submitBtn}
            size={'lg'}
            type="button"
            disabled={!!errors.token}
            onClick={() => setStatus('creation')}
          >
            {t('Buttons.checkEmail')}
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={Routes.SIGN_IN}>{t('Buttons.backToSignin')}</Link>
          </Button>
        </div>

        <div className={cn(status !== 'creation' && 'hidden')}>
          <h1 className={styles.title}>{t('Title.reset')}</h1>
          <p className={styles.undertitle}>{t('Undertitle.reset')}</p>
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem headless className={styles.password}>
                <FormLabel size="base">{t('Labels.Password')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    size="lg"
                    disabled={loading}
                    onBlur={() => {
                      field.onBlur();
                      handlePasswordBlur();
                    }}
                  />
                </FormControl>

                <FormDescription
                  className={cn(
                    'mt-2',
                    !!field.value && !isValidPassword(field.value) && 'hidden',
                  )}
                >
                  {t('Text.create password')}
                </FormDescription>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={styles.confirmPassword}>
                <FormLabel size="base">
                  {t('Labels.Confirm password')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    size="lg"
                    disabled={loading}
                    onBlur={() => {
                      field.onBlur();
                      handlePasswordBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className={styles.submitBtn}
            size={'lg'}
            type="submit"
            disabled={!isValid || loading}
          >
            {t('Buttons.reset')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
