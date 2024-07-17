'use client';

import {
  Button,
  Checkbox,
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
  SignUpFormValues,
  isValidPassword,
  signUpSchema,
} from '@/features/auth';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { Link, useRouter } from '@/shared/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useSignUp } from '@/features/auth';
import styles from './SignUpForm.module.scss';

export const SignUpForm = () => {
  const t = useTranslations('Auth');

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      newsletter: true,
    },
  });

  const router = useRouter();
  const [signUp, { loading }] = useSignUp({
    onCompleted: () => router.push(Routes.ROOT),
  });

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { isValid },
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

  const onSubmit = (values: SignUpFormValues) => signUp(values);

  return (
    <Form {...form}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('Title.signup')}</h1>
        <p className={styles.undertitle}>{t('Undertitle.signup')}</p>

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
              <FormLabel size="base">{t('Labels.Confirm password')}</FormLabel>
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
        <div className={styles.checkboxes}>
          <FormField
            name="agreed"
            control={control}
            render={({ field: { value, ...fieldRest } }) => (
              <FormItem headless>
                <FormControl>
                  <Checkbox
                    {...fieldRest}
                    checked={value}
                    color="black"
                    disabled={loading}
                    required
                  />
                </FormControl>
                <FormDescription>
                  {t('Labels.Agree1')}
                  <Link href={Routes.TERMS_OF_USE} className="underline">
                    {t('Buttons.Terms')}
                  </Link>
                  {t('Labels.Agree2')}
                  <Link className="underline" href={Routes.PRIVACY_POLICY}>
                    {t('Buttons.Privacy')}
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="newsletter"
            render={({ field: { value, ...fieldRest } }) => (
              <FormItem headless>
                <FormControl>
                  <Checkbox
                    {...fieldRest}
                    checked={value}
                    disabled={loading}
                    color={'black'}
                  />
                </FormControl>
                <FormDescription>{t('Labels.Subscribe')}</FormDescription>
              </FormItem>
            )}
          />
        </div>

        <Button
          className={styles.submitBtn}
          size={'lg'}
          type="submit"
          disabled={!isValid || loading}
        >
          {t('Buttons.signup')}
        </Button>
        <p className={styles.alreadyHave}>
          {t('Text.have account')}
          <Link href={Routes.SIGN_IN} prefetch>
            {t('Buttons.signin')}
          </Link>
        </p>
      </form>
    </Form>
  );
};
