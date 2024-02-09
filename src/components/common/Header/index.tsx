'use client'

import { Logo, Visibility } from '@/components/common'

import { Routes, cssVariables } from '@/shared/constants'
import { Link } from '@/shared/navigation'
import { Heart, ShoppingCart, User } from 'lucide-react'
import styles from './Header.module.scss'
import { LanguageSelect, MobileNavbar, Navbar, SearchBar } from './components'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Visibility  breakpoint={`(min-width: ${cssVariables.screenLg})`}>
				<>
					<div className={styles.logo}>
						<Logo />
					</div>
					<Navbar className={styles.navbar} />
				</>
			</Visibility>
			<Visibility ssr fallback={[true]} breakpoint={`(max-width: ${cssVariables.screenLg})`}>
				<div className={styles['mobile-navbar']}>
					<MobileNavbar />
				</div>
			</Visibility>
			<div className={styles['language-select']}>
				<LanguageSelect />
			</div>
			<div className={styles['right-side']}>
				<Visibility ssr fallback={[true]} breakpoint={`(min-width: ${cssVariables.screenXs})`}>
					<SearchBar />
				</Visibility>
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
