"use client"
import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import { Link } from '@/shared/navigation'

import { useTranslations } from 'next-intl'
import { navbarLinks } from './Navbar.data'
import styles from './Navbar.module.scss'

interface INavbarProps {
	className?:string
}

export const Navbar = ({className}:INavbarProps ) => {
	const t = useTranslations()
	return (
		<nav className={className}>
			<ul className={styles.menu__list}>
				{navbarLinks.map(link => (
					<li key={link.href}>
						<Link
							className={cn(
								styles.menu__item,
								link.href === Routes.SALE && styles['menu__item--sale']
							)}
							href={link.href}
						>
							{t(link.key)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
