import { AuthAside } from '@/features/auth'
import {PropsWithChildren} from 'react'

import styles from './layout.module.scss'
import { cn } from '@/lib'
import { getTranslations } from 'next-intl/server'

export default async function AuthLayout({children}:PropsWithChildren)  {

	return <div className={cn('page__container', styles.container)}>
		<AuthAside />
		{children}
	</div>
}	