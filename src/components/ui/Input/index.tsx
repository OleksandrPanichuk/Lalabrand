import { SvgIcon } from '@/components/common'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.scss'

const inputVariants = cva(styles.input, {
  variants: {
    size: {
      base: styles.base,
      md: styles.md,
      lg: styles.lg,
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
  isDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(({
  className,
  size,
  isInValid,
  isDisabled,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      disabled={disabled || isDisabled}
      className={cn(
        inputVariants({ size, className }),
        !!isInValid && styles.invalid,
      )}
      {...props}
    />
  );
})

Input.displayName = 'Input'

export const PasswordInput =  forwardRef<HTMLDivElement, Omit<IInputProps, 'type'>>(function PasswordInput({
  className,
  size,
  isInValid,
  isDisabled,
  disabled,
  ...props
}, ref) {
  const {isOpen:isShowingPassword, toggle} = useDisclosure()
  return (
    <div ref={ref} className={cn(styles['password-input'], styles[`password-input__${size}`], className)}>
      <input
        type={isShowingPassword ? 'text' : 'password'}
        disabled={disabled || isDisabled}
        className={cn(inputVariants({ size }), !!isInValid && styles.invalid)}
        {...props}
      />
      <button
        type="button"
        title="show password"
        onClick={toggle}
      >
        <SvgIcon
          name="showpass"
          width={24}
          height={24}
          fill={isShowingPassword ? '#950707' : 'var(--secondary-400)'}
          stroke={isShowingPassword ? '#950707' : 'var(--secondary-400)'}
        />
      </button>
    </div>
  );
}
)