import { cn } from "@/lib"
import { Link } from "@/shared/navigation"
import { AnchorHTMLAttributes } from "react"
import { UrlObject } from "url"
import styles from './LinkWithCircle.module.scss'

interface ILinkWithCircleProps  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'locale'> {
	innerClassName?:string
	locale?: 'en' | 'ua'
	href: UrlObject | string
} 

export const LinkWithCircle = ({className,children, innerClassName, ...props}:ILinkWithCircleProps) => {
	return <Link   {...props} className={cn(styles.button, className)}>
		<span className={innerClassName}>{children}</span>
	</Link>
};
