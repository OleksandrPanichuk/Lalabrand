'use client'

import { useTranslations } from 'next-intl'

const Page = () => {
	const t = useTranslations('Index')
	return <div>{t('title')}</div>
}

export default Page
