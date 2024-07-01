'use client';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { useCheckoutStore } from '@/features/checkout';
import { RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CardPayment } from '../..';
import styles from './PaymentMethodPicker.module.scss';

export const PaymentMethodPicker = () => {
  const method = useCheckoutStore((state) => state.paymentMethod);
  const setMethod = useCheckoutStore((state) => state.setPaymentMethod);

  const t = useTranslations('Checkout.Payment');

  return (
    <section className={styles.wrapper}>
      <h3>{t('Title')}</h3>
      <p>{t('Text')}</p>
      <RadioGroup
        className={styles.options}
        value={method}
        onChange={setMethod}
      >
        <div className={styles.card}>
          <CardPayment.Option
            className={cn(
              styles.option,
              method === 'card' && styles['option--active'],
            )}
          />
          <motion.div
            initial={false}
            animate={
              method === 'card'
                ? {
                    height: 'auto',
                    opacity: 1,
                    display: 'flex',
                    marginTop: '0px',
                    transition: {
                      height: {
                        duration: 0.4,
                      },
                      opacity: {
                        duration: 0.25,
                        delay: 0.15,
                      },
                    },
                  }
                : {
                    height: 0,
                    opacity: 0,
                    marginTop: '-1.5rem',
                    transition: {
                      height: {
                        duration: 0.4,
                      },
                      opacity: {
                        duration: 0.1,
                      },
                    },
                    transitionEnd: {
                      display: 'none',
                    },
                  }
            }
          >
            <CardPayment.Form />
          </motion.div>
        </div>
        <RadioGroup.Option
          value="receipt"
          className={cn(
            styles.option,
            method === 'receipt' && styles['option--active'],
          )}
        >
          <div />

          <div>
            <SvgIcon name="receipt" width={30} fill="var(--text-color)" />
          </div>

          <div>
            <RadioGroup.Label>{t('Receipt.Title')}</RadioGroup.Label>
            <RadioGroup.Description>
              {t('Receipt.Description')}
            </RadioGroup.Description>
          </div>
        </RadioGroup.Option>
        <RadioGroup.Option
          value="paypal"
          className={cn(
            styles.option,
            method === 'paypal' && styles['option--active'],
          )}
        >
          <div />

          <div>
            <SvgIcon name="paypal" width={32} />
          </div>

          <div>
            <RadioGroup.Label>{t('Paypal.Title')}</RadioGroup.Label>
            <RadioGroup.Description>
              {t('Paypal.Description')}
            </RadioGroup.Description>
          </div>
        </RadioGroup.Option>
      </RadioGroup>
    </section>
  );
};
