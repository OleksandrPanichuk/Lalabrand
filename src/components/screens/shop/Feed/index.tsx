'use client';

import { SvgIcon } from '@/components/common';
import { Card } from '@/components/screens/shop';
import { useShopStore } from '@/store';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { mockData } from './Feed.mock-data';
import styles from './Feed.module.scss';

//Maximum number of products that will be displayed on each page
const PER_PAGE = 1;

export const Feed = () => {
  const query = useShopStore((state) => state.query);
  const page = useShopStore((state) => state.page);
  const setTotalPages = useShopStore((state) => state.setTotalPages);
  const nextPage = useShopStore((state) => state.nextPage);
  const t = useTranslations('Shop');

  const [data, setData] = useState([...mockData]);

  //TODO: зробити запит на бек з нашими query параметрами та номером сторінки
  // Приблизний вигляд запиту
  // const {} = useQuery(QUERY, {
  // 	variables: {
  // 		query,
  // 		page,
  //    take: PER_PAGE
  // 	},
  // 	onCompleted:(response:any) => {
  //    setTotalPages(Math.ceil(response.count / PER_PAGE));
  // 		setData(response.data)
  // 	}
  // })

  //TODO: прибрати це, коли будемо реалізовувати запит до бекенду
  useEffect(() => {
    setData([...mockData].splice((page - 1) * PER_PAGE, PER_PAGE));
  }, [page]);

  useEffect(() => {
    setTotalPages(Math.ceil(mockData.length / PER_PAGE));
  }, [setTotalPages]);

  return (
    <div className={styles.feed}>
      {data.map((item) => (
        <Card data={item} key={item.id} />
      ))}
      <div className={styles.more}>
        <button onClick={nextPage}>
          {t('view more')}
          <SvgIcon name="arrow-right" width={42} />
        </button>
      </div>
    </div>
  );
};
