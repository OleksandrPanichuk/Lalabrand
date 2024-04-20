'use client';

import { useShopStore } from '@/store';
import { useEffect, useState } from 'react';
import { mockData } from './Feed.mock-data';
import { Card } from '@/components/screens/shop'
import styles from './Feed.module.scss'
import { SvgIcon } from '@/components/common'
import { useTranslations } from 'next-intl'

//Maximum number of products that will be displayed on each page
const PER_PAGE = 5;

export const Feed = () => {
  const query = useShopStore((state) => state.query);
  const page = useShopStore((state) => state.page);
  const setTotalProducts = useShopStore((state) => state.setTotalProducts);
  const nextPage = useShopStore(state => state.nextPage)
  const t = useTranslations('Shop')

  const [data, setData] = useState(mockData);

  //TODO: зробити запит на бек з нашими query параметрами та номером сторінки
  // Приблизний вигляд запиту
  // const {} = useQuery(QUERY, {
  // 	variables: {
  // 		query,
  // 		page,
	//    take: PER_PAGE
  // 	},
  // 	onCompleted:(response:any) => {
  // 		setTotalProducts(response.count)
  // 		setData(response.data)
  // 	}
  // })

	//TODO: прибрати це, коли будемо реалізовувати запит до бекенду
	useEffect(() => {
		setData(prev => [...prev].splice((page-1) * PER_PAGE, PER_PAGE))
	},[page])

  return <div className={styles.feed}>
    {data.map(item => (
      <Card data={item} key={item.id} />
    ))}
    <div className={styles.more}>
      <button onClick={nextPage}>
        {t('view more')}
        <SvgIcon name="arrow-right" width={42} />
      </button>
    </div>
  </div>;
};
