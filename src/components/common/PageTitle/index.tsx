import { cn } from '@/lib';
import css from './PageTitle.module.scss';

interface TitleProps {
  pronoun: string;
  name: string;
  className?: string;
}

export const PageTitle = ({ pronoun, name, className }: TitleProps) => {
  return (
    <h2 className={cn(css.title, className)}>
      {pronoun} <span>{name}</span>
    </h2>
  );
};
