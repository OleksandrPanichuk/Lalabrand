'use client'

import { Logo, SvgIcon, Visibility } from '@/components/common'

import { Routes, cssVariables } from '@/shared/constants'
import { Link } from '@/shared/navigation'
import styles from './Header.module.scss'
import {
	LanguageSelect,
	MobileNavbar,
	Navbar,
	SearchBar,
	SearchBarMobile,
} from './components'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Visibility
				ssr
				fallback
				breakpoint={`(max-width: ${cssVariables.screenXl})`}
			>
				<div className={styles['mobile-navbar']}>
					<MobileNavbar />
				</div>
			</Visibility>

			<Visibility
				ssr
				fallback
				breakpoint={`(min-width: ${cssVariables.screenMd})`}
			>
				<Logo className={styles.logo} />
			</Visibility>

			<Visibility
				ssr
				fallback
				breakpoint={`(min-width: ${cssVariables.screenXl})`}
			>
				<Navbar className={styles.navbar} />
			</Visibility>

			<div className={styles['right-side']}>
				<LanguageSelect />
				<Visibility
					ssr
					fallback
					breakpoint={`(min-width: ${cssVariables.screenXs})`}
				>
					<SearchBar />
				</Visibility>
				<Visibility
					ssr
					fallback
					breakpoint={`(max-width: ${cssVariables.screenXs})`}
				>
					<SearchBarMobile />
				</Visibility>
				<ul className={styles['right-side__links']}>
					<li>
						<Link className={styles.link} href={Routes.WISHLIST}>
							<SvgIcon name='like' />
						</Link>
					</li>
					<li>
						<Link className={styles.link} href={Routes.PROFILE}>
							<SvgIcon name='account' />
						</Link>
					</li>
					<li>
						<Link className={styles.link} href={Routes.CART}>
							<SvgIcon name='cart' />
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}
