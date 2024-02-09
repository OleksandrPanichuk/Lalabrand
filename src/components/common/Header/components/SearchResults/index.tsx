'use client'
import { Routes } from '@/shared/constants'
import { usePathname, useRouter } from '@/shared/navigation'
import { Transition } from '@headlessui/react'
import { SearchIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Fragment, forwardRef } from 'react'
import { data } from './SearchResults.data'

import styles from './SearchResults.module.scss'

import qs from 'query-string'

interface ISearchResultsProps {
	isOpen: boolean
	searchValue: string

	resetSearchValue: () => void
}

export const SearchResults = forwardRef<HTMLDivElement, ISearchResultsProps>(
	({ isOpen, searchValue, resetSearchValue }, ref) => {
		const router = useRouter()
		const pathname = usePathname()
		const searchParams = useSearchParams()

		const onClick = (type: string) => {
			if (pathname === Routes.SHOP) {
				const query: Record<string, string> = {
					type,
				}
				searchParams.forEach((value, key) => {
					if (key !== 'type') {
						query[key] = value
					}
				})

				const url = qs.stringifyUrl({
					url: pathname,
					query,
				})
				router.push(url)
			} else {
				router.push(`${Routes.SHOP}?type=${type}`)
			}

			resetSearchValue()
		}

		const filteredData = searchValue ? data.filter(item =>
			item.toLowerCase().includes(searchValue.toLowerCase())
		) : []
		return (
			<Transition
				as={Fragment}
				enter='ease-out duration-300'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='ease-in duration-200'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
				show={isOpen}
			>
				<div
					ref={ref}
					className={styles.wrapper}
				>
					{filteredData.length ? (
						<ul className={styles.list}>
							{filteredData.map((item, i) => (
								<li
									onClick={() => onClick(item)}
									className={styles.result}
									key={i}
								>
									<SearchIcon />
									{item}
								</li>
							))}
						</ul>
					) : (
						<span className={styles['no-results']}>No Results Found</span>
					)}
				</div>
			</Transition>
		)
	}
)

SearchResults.displayName = 'SearchResults'
