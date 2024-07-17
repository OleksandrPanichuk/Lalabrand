import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import styles from './Label.module.scss';

const labelVariants = cva(styles.default, {
  variants: {
    size: {
      base: styles.base,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface ILabelProps
  extends ComponentPropsWithoutRef<'label'>,
    VariantProps<typeof labelVariants> {}

export const Label = forwardRef<ElementRef<'label'>, ILabelProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <label
        ref={ref}
        {...props}
        className={labelVariants({ className, size })}
      />
    );
  },
);

Label.displayName = 'Label';
