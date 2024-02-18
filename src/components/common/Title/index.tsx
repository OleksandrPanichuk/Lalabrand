import { cn } from '@/lib'
import css from './Title.module.scss';
import { useTranslations } from 'next-intl';

interface TitleProps {
  name: string;
  className?:string
}

export const Title = ({ name, className }: TitleProps) => {
  const t = useTranslations();

  return (
    <h2 className={cn(css.title, className)}>
      {' '}
      {t('Home.Titles.Our')} <span>{name}</span>
    </h2>
  );
};
