'use client';

import { SvgIcon } from '@/components/common';
import { Card, useShopStore } from '@/features/shop';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { mockData } from './Feed.mock-data';
import styles from './Feed.module.scss';

//Maximum number of products that will be displayed on each page
const PER_PAGE = 5;

export const Feed = () => {
  const query = useShopStore((state) => state.query);
  const page = useShopStore((state) => state.page);
  const setTotalPages = useShopStore((state) => state.setTotalPages);
  const nextPage = useShopStore((state) => state.nextPage);
  const t = useTranslations('Shop');

  const totalPages = useMemo(() => Math.ceil(mockData.length / PER_PAGE), []);

  const searchParams = useSearchParams();

  const [data, setData] = useState([...mockData]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  //TODO: зробити запит на бек з нашими query параметрами та номером сторінки
  // Приблизний вигляд запиту
  // const {} = useQuery(QUERY, {
  //   variables: {
  //     ...getQueryVariables(searchParams, query, page, !mounted),
  //     take: PER_PAGE,
  //   },
  //   onCompleted: handleQueryCompleted,
  // });

  // function handleQueryCompleted(response: any) {
  //   setTotalPages(Math.ceil(response.count / PER_PAGE));
  //   setData(response.data);
  // }

  //TODO: прибрати це, коли будемо реалізовувати запит до бекенду
  useEffect(() => {
    setData([...mockData].splice((page - 1) * PER_PAGE, PER_PAGE));
  }, [page]);

  useEffect(() => {
    setTotalPages(totalPages);
  }, [setTotalPages, totalPages]);

  return (
    <div className={styles.feed}>
      {data.map((item) => (
        <Card data={item} key={item.id} />
      ))}
      <div className={styles.more}>
        <button onClick={nextPage} disabled={totalPages <= page}>
          {t('view more')}
          <SvgIcon name="arrow-right" width={42} />
        </button>
      </div>
    </div>
  );
};
