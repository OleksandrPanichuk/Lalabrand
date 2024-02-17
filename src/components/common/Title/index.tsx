import css from './Title.module.scss';
import { useTranslations } from 'next-intl';

interface TitleProps {
  name: string;
}

export const Title = ({ name }: TitleProps) => {
  const t = useTranslations();

  return (
    <h2 className={css.title}>
      {' '}
      {t('Home.Titles.Ours')} <span>{name}</span>
    </h2>
  );
};
