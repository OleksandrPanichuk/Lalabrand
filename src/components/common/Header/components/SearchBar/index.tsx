'use client'
import { useDebounce } from '@/hooks'
import { Transition } from '@headlessui/react'
import { Search } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useClickOutside } from './SearchBar.hooks'
import styles from './SearchBar.module.scss'
import { SearchResults } from '..'

export const SearchBar = () => {
	const [open, setOpen] = useState<boolean>(false)

	const popoverRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLLabelElement>(null)

	useClickOutside(popoverRef, labelRef, () => setOpen(false))

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
					placeholder='search products'
				/>
				<Search className={styles.icon} />
			</label>

			<SearchResults ref={popoverRef} isOpen={open} searchValue={debouncedSearchValue} resetSearchValue={() => setSearchValue('')}  />
		</div>
	)
}
