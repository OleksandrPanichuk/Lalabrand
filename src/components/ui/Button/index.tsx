import { cn } from '@/lib';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      gray: styles.gray,
      outline: styles.outline,
    },
    size: {
      sm: 'text-sm font-medium p-3',
      lg: 'text-lg font-semibold px-5 py-4',
      md: 'text-md font-semibold p-5',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, asChild = false, size, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className, size }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
