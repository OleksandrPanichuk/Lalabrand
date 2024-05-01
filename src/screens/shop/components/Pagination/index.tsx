'use client';

import { Pagination as PaginationBase } from '@/components/ui';
import { useShopStore } from '@/store';
import styles from './Pagination.module.scss'

export const Pagination = () => {
  const totalPages = useShopStore((state) => state.totalPages);
  const page = useShopStore((state) => state.page);
  const setPage = useShopStore((state) => state.setPage);


  if (!totalPages) return null;

  return (
    <PaginationBase
      totalPages={totalPages}
      page={page}
      onPageChange={setPage}
      classNames={{
        wrapper: styles.wrapper,
        active: styles.active,
        dots:styles.dots,
        item:styles.item
      }}
    />
  );
};
