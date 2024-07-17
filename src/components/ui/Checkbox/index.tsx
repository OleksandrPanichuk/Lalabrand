import { InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.scss'
import {cva, VariantProps} from "class-variance-authority";


const checkboxVariants = cva(styles.checkbox, {
  variants: {
    color: {
      red:styles.red,
      black:styles.black
    }
  },
  defaultVariants: {
    color:'red'
  }
})

interface ICheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'color'>, VariantProps<typeof checkboxVariants> {
}

export const Checkbox = ({ className, color, ...props }: ICheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={checkboxVariants({color, className})}
      {...props}
    />
  );
};
