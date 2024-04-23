'use client';

import { usePagination } from '@/hooks';
import { cn } from '@/lib';
import styles from './Pagination.module.scss'

interface IPaginationProps {
  page?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;

  classNames?: {
    wrapper?: string;
    nextButton?: string;
    prevButton?: string;

    item?: string;
    dots?: string;
    active?: string;
  };
}

export const Pagination = ({
  totalPages,
  onPageChange,
  page,
  classNames,
}: IPaginationProps) => {
  const { currentPage, getPageNumbers, goToPage } = usePagination(
    totalPages,
    page,
  );

  const onChange = (page: number) => {
    goToPage(page);
    onPageChange?.(page);
  };

  return (
    <div className={cn(styles.pagination,classNames?.wrapper)}>
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className={classNames?.prevButton}
      >
        Back
      </button>
      {getPageNumbers().map((el, index) => {
        if (el === 'dots') {
          return (
            <span className={classNames?.dots} key={index}>
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            className={cn(
              classNames?.item,
              currentPage === el && classNames?.active,
              currentPage === el && styles.active
            )}
            onClick={() => onChange(el)}
          >
            {el}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className={classNames?.nextButton}
      >
        Next
      </button>
    </div>
  );
};
