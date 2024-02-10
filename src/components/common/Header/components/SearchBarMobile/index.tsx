'use client'

import { useClickOutside, useDebounce } from '@/hooks'
import { SearchIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useRef, useState } from 'react'
import { SearchResults } from '..'

import { Transition } from '@headlessui/react'
import styles from './SearchBarMobile.module.scss'

export const SearchBarMobile = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')

	const debouncedSearchValue = useDebounce(searchValue)

	const t = useTranslations('Header.SearchBar')

	const popoverRef = useRef<HTMLDivElement>(null)
	const searchFieldRef = useRef<HTMLFormElement>(null)

	useClickOutside([popoverRef, searchFieldRef], () => setOpen(false))

	useEffect(() => {
		setOpen(!!debouncedSearchValue)
	}, [debouncedSearchValue])

	const onFocus = () => {
		if (debouncedSearchValue && !open) {
			setOpen(true)
		}
	}

	return (
		<>
			<button className={styles.trigger} onClick={() => setIsVisible(true)}>
				<SearchIcon />
			</button>

			<Transition
				show={isVisible}
				as={Fragment}
				enter='ease-out duration-300'
				enterFrom='opacity-0 top-[-100px]'
				enterTo='opacity-100 top-[0px]'
				leave='ease-in duration-200'
				leaveFrom='opacity-100 top-[0px]'
				leaveTo='opacity-0 top-[-100px]'
			>
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<form onSubmit={(e) => e.preventDefault()} className={styles.label} ref={searchFieldRef}>
							<SearchIcon />

							<label>
								<input
									onFocus={onFocus}
									aria-label='search products'
									value={searchValue}
									onChange={e => setSearchValue(e.target.value)}
									placeholder={t('Placeholder')}
								/>
							</label>
						</form>
						<button onClick={() => setIsVisible(false)}>
							<XIcon />
						</button>
					</div>

					<SearchResults
						ref={popoverRef}
						isOpen={open}
						resetSearchValue={() => {
							setSearchValue('')
							setIsVisible(false)
						}}
						searchValue={debouncedSearchValue}
					/>
				</div>
			</Transition>
		</>
	)
}
