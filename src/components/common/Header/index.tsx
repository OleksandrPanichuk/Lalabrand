'use client'

import { Logo } from '@/components/common'

import { Routes } from '@/shared/constants'
import { Link } from '@/shared/navigation'
import { Heart, ShoppingCart, User } from 'lucide-react'
import styles from './Header.module.scss'
import { LanguageSelect, MobileNavbar, Navbar, SearchBar } from './components'

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Logo />
			</div>
			<div className={styles['mobile-navbar']}>
				<MobileNavbar />
			</div>
			<Navbar className={styles.navbar} />
			<div className={styles['language-select']}>
				<LanguageSelect />
			</div>
			<div className={styles['right-side']}>
				<SearchBar />
				<ul className={styles['right-side__links']}>
					<li>
						<Link className={styles.link} href={Routes.WISHLIST}>
							<Heart />
						</Link>
					</li>
					<li>
						<Link className={styles.link} href={Routes.CART}>
							<ShoppingCart />
						</Link>
					</li>
					<li>
						<Link className={styles.link} href={Routes.PROFILE}>
							<User />
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}
