import { cn } from '@/lib';
import { VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

const inputVariants = cva(styles.input, {
  variants: {
    size: {
      base: styles.base,
      md: styles.md,
      lg:styles.lg
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  isInValid?: boolean;
}

export const Input = ({
  className,
  size,
  isInValid,
  ...props
}: IInputProps) => {
  return (
    <input
      className={cn(
        inputVariants({ size, className }),
        !!isInValid && styles.invalid,
      )}
      {...props}
    />
  );
};
