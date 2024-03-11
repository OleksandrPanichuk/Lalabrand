import { cn } from '@/lib';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInValid?: boolean;
}

export const Input = ({ className, isInValid, ...props }: IInputProps) => {
  return (
    <input
      className={cn(styles.input, isInValid && styles.invalid, className)}
      {...props}
    />
  );
};
