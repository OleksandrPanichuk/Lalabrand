'use client';
import { Breadcrumbs, PageTitle } from '@/components/common';
import { Card } from '@/components/screens/home';
import { cn } from '@/lib';
import css from './page.module.scss';
import { Routes } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import { favoritesFromBackend } from './wishlist.fakeData';

const Page = () => {
  const t = useTranslations();
  const counter = favoritesFromBackend.length;
  return (
    <div className={cn('page__container', css.container)}>
      <Breadcrumbs>
        <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
        <Breadcrumbs.Item href={Routes.SHOP}>categories</Breadcrumbs.Item>
      </Breadcrumbs>
      <section className={css.content}>
        <PageTitle
          pronoun={t('Wishlist.Title.My')}
          name={t('Wishlist.Title.Favorites')}
        />
        <ul>
          {favoritesFromBackend.map((el) => (
            <li key={el.id} className={css.column}>
              <Card item={el} width={'394px'} inFav={true} />
            </li>
          ))}
        </ul>
        {counter > 0 && (
          <p className={css.counter}>
            {counter}{' '}
            {counter > 1
              ? t('Wishlist.Counter')
              : t('Wishlist.Counter').slice(0, -1)}
          </p>
        )}
      </section>
    </div>
  );
};

export default Page;
