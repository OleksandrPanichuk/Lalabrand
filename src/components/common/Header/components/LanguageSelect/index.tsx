'use client'
import { usePathname, useRouter } from '@/shared/navigation'
import { useLocale } from 'next-intl'

import { SvgIcon } from '@/components/common/SvgIcon'
import { cn } from '@/lib'
import { Listbox, Transition } from '@headlessui/react'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'
import styles from './LanguageSelect.module.scss'

const options = [
	{
		label: 'EN',
		value: 'en',
	},
	{
		label: 'UA',
		value: 'ua',
	},
]



export const LanguageSelect = () => {
	const pathname = usePathname()
	const router = useRouter()
	const locale = useLocale()
	const searchParams = useSearchParams()

	const onLanguageChange = (locale: string) => {
		router.push(`${pathname}?${searchParams.toString()}`, { locale })
	}
	return (
		<Listbox value={locale} onChange={onLanguageChange}>
			<div className={'relative'}>
				<Listbox.Button className={styles.trigger}>
					{({ open, value }) => (
						<>
							{options.find(opt => opt.value === value)?.label}
							<SvgIcon name='chevron' width={10}  className={cn(styles.chevron, open && styles['chevron--open'])} />
						</>
					)}
				</Listbox.Button>
				<Transition
					enter='transition-opacity  duration-200 ease-in-out'
					enterFrom='opacity-0'
					enterTo='opacity-100 '
					leave=' duration-200 transition-opacity ease-in-out'
					leaveFrom='opacity-100 '
					leaveTo='opacity-0'
					as={Fragment}
				>
					<Listbox.Options className={styles.options}>
						<hr className='h-[1px] bg-border' />
						{options.map((option, index) => (
							<Fragment key={option.value}>
								<Listbox.Option className={styles.option} value={option.value}>
									{({ selected }) => (
										<span className={cn(selected && styles.selected)}>
											{option.label}
										</span>
									)}
								</Listbox.Option>

								{index !== options.length - 1 && (
									<hr className='h-[1px] bg-border' />
								)}
							</Fragment>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}
