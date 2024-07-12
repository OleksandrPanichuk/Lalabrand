'use client';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
} from '@/components/ui';
import { SignInFormValues, signInSchema, useSignIn } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link, useRouter } from '@/shared/navigation';
import styles from './SignInForm.module.scss';

export const SignInForm = () => {
  const t = useTranslations('Auth');

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const [signIn, { loading }] = useSignIn({
    // onCompleted: () => router.push(Routes.ROOT),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;

  const onSubmit = (values: SignInFormValues) => signIn(values);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={'auth__title'}>{t('Title.signin')}</h1>
        <p className={'auth__undertitle'}>{t('Undertitle.signin')}</p>

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className={styles.email}>
              <FormLabel size="base">{t('Labels.Email')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  size="lg"
                  placeholder="example@gmail.com"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className={cn(styles.password, 'mt-6')}>
              <FormLabel size="base">{t('Labels.Password')}</FormLabel>
              <FormControl>
                <PasswordInput {...field} size="lg" disabled={loading} />
              </FormControl>
              <div className={'flex justify-between items-center w-full gap-2'}>
                <FormMessage />
                <div className="flex-1" />
                <Link
                  href={Routes.FORGOT_PASSWORD}
                  className={styles.password__forgot}
                >
                  {t('Buttons.Forgot password')}
                </Link>
              </div>
            </FormItem>
          )}
        />

        <Button
          className="w-full mt-[3rem] py-[15px]"
          size={'lg'}
          type="submit"
          disabled={!isValid || loading}
        >
          {t('Buttons.signin')}
        </Button>
        <p className="text-center  mt-6 text-base font-inter font-medium text-[rgb(60, 66, 66)]">
          {t('Text.create account')}
          <Link
            href={Routes.SIGN_UP}
            className="text-[var(--info-500)] underline"
            prefetch
          >
            {t('Buttons.signup')}
          </Link>
        </p>
      </form>
    </Form>
  );
};
