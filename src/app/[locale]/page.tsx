'use client';
import { Hero } from '@/components/screens/home';
import Image from 'next/image';
import { SvgIcon, Title } from '@/components/common';
import { Card } from '@/components/screens/home';
import { Link } from '@/shared/navigation';
import { bestsellersFromBackend } from '@/components/screens/home/home.fakeData';
import { useRefreshLookStore } from '@/store';
import css from './page.module.scss';

const Page = () => {
  const { looks, changeLook } = useRefreshLookStore();

  return (
    <div className={css.wrapper}>
      <Hero />
      {/* second section */}
      <section className={css.bestsellers}>
        <Title name="bestsellers" />
        <div>
          <ul>
            {bestsellersFromBackend.map((el) => (
              <li key={el.id} className={css.column}>
                <Card item={el} />
              </li>
            ))}
          </ul>
          <Link href={'/shop'}>
            view more
            <SvgIcon name="arrow" width={42} height={16} fill={'#222'} />
          </Link>
        </div>
      </section>
      {/* end of second section */}
      {/* third section */}
      <section className={css.bestsellers}>
        <Title name="looks" />
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
            refresh look
            <SvgIcon name="refresh" width={32} height={32} fill={'#222'} />
          </button>
        </div>
      </section>
      {/* end of third section */}
    </div>
  );
};

export default Page;
