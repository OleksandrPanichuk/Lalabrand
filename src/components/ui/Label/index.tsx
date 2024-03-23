import { cn } from "@/lib"
import { LabelHTMLAttributes } from "react"
import styles from './Label.module.scss'
interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({className, ...props}:ILabelProps) => {
	return <label {...props} className={cn(styles.label, className)} />;
};
