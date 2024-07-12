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
} from '@/components/ui'
import {
  isValidPassword,
  resetPasswordFormSchema,
  ResetPasswordFormValues,
  useResetPassword,
  useSendResetPassCode,
} from '@/features/auth'
import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import { Link, useRouter } from '@/shared/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const ResetPasswordForm = () => {
  const t = useTranslations('Auth');

  const [email, setEmail] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('lalabrand:email');
    if (!emailFromStorage) {
      router.push(Routes.FORGOT_PASSWORD);
    } else {
      setEmail(emailFromStorage);
    }
  }, [router]);

  const [resendToken] = useSendResetPassCode();
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

  const onSubmit = ({token, password}: ResetPasswordFormValues) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className={cn(status !== 'verification' && 'hidden')}>
          <h1 className={'auth__title'}>{t('Title.checkEmail')}</h1>
          <p className={'auth__undertitle mb-8 mt-3'}>
            {t('Undertitle.checkEmail')}
            <button
              onClick={onResend}
              className="font-semibold text-[var(--primary-500)]"
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
            className="w-full mt-[3rem] mb-4 py-[15px]"
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
          <h1 className={'auth__title'}>{t('Title.reset')}</h1>
          <p className={'auth__undertitle mb-8 mt-3'}>
            {t('Undertitle.reset')}
          </p>
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className={'mt-6'}>
                <FormLabel size="base">{t('Labels.Password')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
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
                    !!field.value && !isValidPassword(field.value) && 'hidden',
                  )}
                >
                  {t('Text.create password')}
                </FormDescription>
                <FormMessage className="my-2" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={'min-h-[114px] mt-6'}>
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
            className="w-full mt-[3rem] mb-4 py-[15px]"
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
