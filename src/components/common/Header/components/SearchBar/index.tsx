'use client'
import { useClickOutside, useDebounce } from '@/hooks'
import { Search, SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { SearchResults } from '..'
import styles from './SearchBar.module.scss'
import { SvgIcon } from '@/components/common'

export const SearchBar = () => {
	const [open, setOpen] = useState<boolean>(false)
	const t = useTranslations('Header.SearchBar')

	const popoverRef = useRef<HTMLDivElement>(null)
	const searchFieldRef = useRef<HTMLFormElement>(null)

	useClickOutside([popoverRef, searchFieldRef], () => setOpen(false))

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
			<form
				onSubmit={e => e.preventDefault()}
				ref={searchFieldRef}
				className={styles.label}
			>
				<label>
					<input
						onFocus={onFocus}
						aria-label='search products'
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						className={styles.input}
						placeholder={t('Placeholder')}
					/>
				</label>
				<SvgIcon name='search' className={styles.icon} />
			</form>

			<SearchResults
				ref={popoverRef}
				isOpen={open}
				searchValue={debouncedSearchValue}
				resetSearchValue={() => setSearchValue('')}
			/>
		</div>
	)
}
