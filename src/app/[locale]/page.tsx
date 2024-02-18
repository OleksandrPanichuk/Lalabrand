'use client';
import { CategoryPreview, Hero } from '@/components/screens/home';
import Image from 'next/image';
import { SvgIcon, Title } from '@/components/common';
import { Card } from '@/components/screens/home';
import { Link } from '@/shared/navigation';
import { useTranslations } from 'next-intl';
import { bestsellersFromBackend } from '@/components/screens/home/home.fakeData';
import { useRefreshLookStore } from '@/store';
import css from './page.module.scss';
import { cn } from '@/lib'

const Page = () => {
  const { looks, changeLook } = useRefreshLookStore();
  const t = useTranslations();

  return (
    <div className={css.wrapper}>
      <Hero />
      {/* second section */}
      <section className={cn(css.bestsellers,'page__container')}>
        <Title name={t('Home.Titles.Bestsellers')} />
        <div>
          <ul>
            {bestsellersFromBackend.map((el) => (
              <li key={el.id} className={css.column}>
                <Card item={el} />
              </li>
            ))}
          </ul>
          <Link href={'/shop'}>
            {t('Home.Buttons.view more')}
            <SvgIcon name="arrow" width={42} height={16} fill={'#222'} />
          </Link>
        </div>
      </section>
      {/* end of second section */}
      {/* third section */}
      <section className={cn(css.bestsellers, 'page__container')}>
        <Title name={t('Home.Titles.Looks')} />
        <div className={css.flexEnd}>
          <Image
            src={looks[0].lookImg}
            width={288}
            height={533}
            alt={looks[0].lookName}
            className={css.lookImg}
          />
          <ul className={css.lookList}>
            {looks[0].items.map((el) => (
              <li key={el.id} className={css.column}>
                <Card item={el} />
              </li>
            ))}
          </ul>
          <button
           
            
            type="button"
            onClick={changeLook}
            className={css.refreshBtn}
          >
            {t('Home.Buttons.refresh look')}
            <SvgIcon name="refresh" width={32} height={32} fill={'#222'} />
          </button>
        </div>
      </section>
      {/* end of third section */}

      {/* <CategoryPreview /> */}
    </div>
  );
};

export default Page;
