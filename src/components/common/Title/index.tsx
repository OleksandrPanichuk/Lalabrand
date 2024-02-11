import css from './Title.module.scss';

interface TitleProps {
  name: string;
}

export const Title = ({ name }: TitleProps) => {
  return (
    <h2 className={css.title}>
      {' '}
      Our <span>{name}</span>
    </h2>
  );
};
