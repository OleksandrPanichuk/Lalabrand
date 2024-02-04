'use client'

import { LanguageSelect, Logo } from '@/components/common'

import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import { Link } from '@/shared/navigation'
import { Heart, ShoppingCart, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { headerLinks } from './Header.data'
import styles from './Header.module.scss'

export const Header = () => {
	const t = useTranslations()
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Logo />
			</div>
			<nav>
				<ul className={styles.menu__list}>
					{headerLinks.map(link => (
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
			<div className='flex justify-end'>
				{/* TODO: Search Input */}
				<LanguageSelect />
			</div>
			<nav className='flex justify-end'>
				<ul className='flex items-center gap-2'>
					<li>
						<Link href={Routes.WISHLIST}>
							<Heart />
						</Link>
					</li>
					<li>
						<Link href={Routes.PROFILE}>
							<User />
						</Link>
					</li>
					<li>
						<Link href={Routes.CART}>
							<ShoppingCart />
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
