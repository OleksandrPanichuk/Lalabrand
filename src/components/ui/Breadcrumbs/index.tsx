"use client"
import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { Link, useRouter } from '@/shared/navigation';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { UrlObject } from 'url';
import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
   
  }

export const Breadcrumbs = ({
  children,
  className,
  ...props
}: PropsWithChildren<IBreadcrumbsProps>) => {
  const items = Children.toArray(children);
  return (
    <nav className={cn(styles.wrapper, className)} {...props}>
     <BreadcrumbsBack />
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={cn(isLast && styles.last)}>
              {item}
              {!isLast && '/'}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

interface IBreadcrumbsItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'locale'> {
  locale?: 'en' | 'ua';
  href: UrlObject | string;
}

export  function BreadcrumbsItem(props: IBreadcrumbsItemProps) {
  return <Link {...props} />;
};

Breadcrumbs.Item = BreadcrumbsItem

interface IBreadcrumbsBackProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
function BreadcrumbsBack(props: IBreadcrumbsBackProps) {
  const router = useRouter();
  return (
    <button
      {...props}
      className={cn(props.className, styles.back)}
      onClick={(e) => {
        props?.onClick?.(e);
        router.back();
      }}
    >
      <SvgIcon width={16}  name="arrow-back" />
    </button>
  );
};

