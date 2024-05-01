'use client';
import { CartItem, SvgIcon } from '@/components/common'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { useCartStore } from '@/store'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './OrderPreview.module.scss'

export const OrderPreview = () => {
  const { isOpen, toggle } = useDisclosure();
  const t = useTranslations('Checkout.Order Preview');
  const cartItems = useCartStore((state) => state.items);

  return (
    <section className={styles.wrapper}>
      <h3>{t('Title')}</h3>
      <p>{t('Text')}</p>
      <div className={styles.line}>
        {cartItems.slice(0, 5).map((item) => (
          <div className={styles['line__item']} key={item.id}>
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={106}
              height={140}
            />
          </div>
        ))}
        {cartItems.length >= 5 && <div className={styles.overlay} />}
        <button
          className={cn(
            styles.more,
            isOpen ? styles.open : styles.closed,
            cartItems.length >= 5 && styles['more--extended'],
          )}
          onClick={toggle}
        >
          {t('More')}
          <SvgIcon name="arrow-right" width={46} />
        </button>
      </div>

      <motion.div
        initial={false}
        className={styles.preview}
        animate={
          isOpen
            ? {
                height: 'auto',
                opacity: 1,
                display: 'flex',
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
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.3,
                  },
                },
                transitionEnd: {
                  display: 'none',
                },
              }
        }
      >
        {cartItems.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </motion.div>
    </section>
  );
};
