import { cn } from '@/lib';
import { Link } from '@/shared/navigation';
import {
  AnchorHTMLAttributes,
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { UrlObject } from 'url';
import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Breadcrumbs = ({
  children,
  className,
  ...props
}: PropsWithChildren<IBreadcrumbsProps>) => {
  const items = Children.toArray(children);
  return (
    <nav className={cn(styles.wrapper, className)} {...props}>
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

Breadcrumbs.Item = function BreadcrumbsItem({
  ...props
}: IBreadcrumbsItemProps) {
  return <Link {...props} />;
};
