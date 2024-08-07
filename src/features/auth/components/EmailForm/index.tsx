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
} from '@/components/ui';
import {
  emailFormSchema,
  EmailFormValues,
  useSendResetPassCode,
} from '@/features/auth';
import { Routes } from '@/shared/constants';
import { Link, useRouter } from '@/shared/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import styles from './EmailForm.module.scss';

export const EmailForm = () => {
  const t = useTranslations('Auth');
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const [sendResetPassToken, { loading }] = useSendResetPassCode({
    onCompleted: () => {
      sessionStorage.setItem('lalabrand:email', form.getValues().email);
      router.push(Routes.RESET_PASSWORD);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit = (values: EmailFormValues) => sendResetPassToken(values);

  return (
    <Form {...form}>
      <form onClick={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>{t('Title.forgot')}</h1>
        <p className={styles.undertitle}>{t('Undertitle.forgot')}</p>

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

        <Button
          className={styles.submitBtn}
          size={'lg'}
          type="submit"
          disabled={!isValid || loading}
        >
          {t('Buttons.forgot')}
        </Button>
        <Button asChild variant="outline" size="lg" disabled={loading}>
          <Link href={Routes.SIGN_IN}>{t('Buttons.backToSignin')}</Link>
        </Button>
      </form>
    </Form>
  );
};
