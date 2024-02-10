'use client'
import { useDebounce } from '@/hooks'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SearchResults } from '..'
import styles from './SearchBar.module.scss'
import { useClickOutside } from '@/hooks'
import { useTranslations } from 'next-intl'

export const SearchBar = () => {
	const [open, setOpen] = useState<boolean>(false)
	const t = useTranslations('Header.SearchBar')

	const popoverRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLLabelElement>(null)

	useClickOutside([popoverRef, labelRef], () => setOpen(false))

	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearchValue = useDebounce(searchValue)

	useEffect(() => {
		setOpen(!!debouncedSearchValue)
	}, [debouncedSearchValue])

	const onFocus = () => {
		if (debouncedSearchValue && !open) {
			setOpen(true)
		}
	}

	return (
		<div className='relative'>
			<label ref={labelRef} className={styles.label}>
				<input
					onFocus={onFocus}
					aria-label='search products'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className={styles.input}
					placeholder={t('Placeholder')}
				/>
				<Search className={styles.icon} />
			</label>

			<SearchResults
				ref={popoverRef}
				isOpen={open}
				searchValue={debouncedSearchValue}
				resetSearchValue={() => setSearchValue('')}
			/>
		</div>
	)
}
