import { cn } from '@/lib';
import css from './Title.module.scss';
import { HTMLAttributes } from 'react'

interface TitleProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'name'> {
  pronoun: string;
  name: string;
}

export const Title = ({ pronoun, name, className, ...props }: TitleProps) => {
  return (
    <h2 className={cn(css.title, className)} {...props}>
      {pronoun} <span>{name}</span>
    </h2>
  );
};
