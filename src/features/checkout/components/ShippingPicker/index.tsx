'use client';

import { useCheckoutStore } from '@/features/checkout';
import { cn } from '@/lib';
import { RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { variants } from './ShippingPicker.data';
import styles from './ShippingPicker.module.scss';

export const ShippingPicker = () => {
  const variant = useCheckoutStore((state) => state.shippingVariant);
  const setVariant = useCheckoutStore((state) => state.setShippingVariant);

  const t = useTranslations('Checkout.Shipping');

  return (
    <section className={styles.wrapper}>
      <h3>{t('Title')}</h3>
      <p>{t('Text')}</p>
      <RadioGroup
        className={styles.options}
        value={variant}
        onChange={setVariant}
      >
        {variants.map(({ Form, Option, value }) => (
          <div key={value}>
            <Option
              className={cn(
                styles.option,
                value === variant && styles['option--active'],
              )}
            />
            <motion.div
              initial={false}
              animate={
                value === variant
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
              <Form />
            </motion.div>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
};
