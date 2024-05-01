import { cn } from "@/lib"
import { InputHTMLAttributes } from "react"
import styles from './Radio.module.scss'

interface IRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Radio = ({className, ...props}: IRadioProps) => {
	return <input className={cn(styles.radio, className)} type="radio" {...props} />
};
