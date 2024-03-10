'use client';
import { Breadcrumbs, CartInfo, Title } from '@/components/common';
import { CartItem, ShippingFee } from '@/components/screens/cart';
import { cn } from '@/lib';
import { Routes } from '@/shared/constants';
import { useCartStore } from '@/store';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';
import { Button } from '@/components/ui';
import { Link } from '@/shared/navigation'

const Page = () => {
  const t = useTranslations();
  const items = useCartStore((state) => state.items);

  return (
    <div className={cn('page__container', styles.container)}>
      <div className={styles.top}>
        <Breadcrumbs>
          <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
          <Breadcrumbs.Item href={Routes.CART}>cart</Breadcrumbs.Item>
        </Breadcrumbs>
        <span className={styles.count}>
          {items.length === 1 ? '1 item' : `${items.length} items`}
        </span>
      </div>
      <section className={styles.content}>
        <Title
          name={t('Titles.Bag')}
          pronoun={t('Titles.Shopping')}
          className={styles.title}
        />
        {items.length > 0 ? (
          <div className={styles.grid}>
            <ShippingFee />
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem data={item} key={item.id} />
              ))}
            </div>
            <CartInfo />
          </div>
        ) : (
          <>
            <ShippingFee />
            <div className={styles.empty}>
              <h2>{t('Cart.Empty.Title')}</h2>
              <Button variant={'outline'} size={'lg'} asChild>
                <Link href={Routes.SHOP}>{t("Cart.Empty.Button")}</Link>
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
