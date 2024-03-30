import { cn } from "@/lib"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import styles from './Label.module.scss'


export const Label = forwardRef<ElementRef<'label'>, ComponentPropsWithoutRef<'label'>>(({className, ...props}, ref) => {
	return <label ref={ref} {...props} className={cn(styles.label, className)} />;
})


Label.displayName = 'Label'