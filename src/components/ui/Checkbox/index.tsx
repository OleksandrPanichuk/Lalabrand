import { InputHTMLAttributes } from "react"
import styles from './Checkbox.module.scss'
import { cn } from "@/lib"

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = ({className, ...props}:ICheckboxProps) => {
	return <input  type='checkbox' className={cn(styles.checkbox, className)} {...props} />
};
