'use client'
import { useDisclosure } from '@/hooks'
import { Dialog, Transition } from '@headlessui/react'
import { Search } from 'lucide-react'
import { Fragment, useState } from 'react'
import styles from './SearchBar.module.scss'

export const SearchBar = () => {
	const { isOpen, open, close } = useDisclosure()
	const [searchValue, setSearchValue] = useState<string>('')
	return (
		<>
			<label onClick={open} className={styles.label}>
				<input
					aria-label='search products'
					value={searchValue}
					readOnly
					className={styles.input}
					placeholder='search products'
				/>
				<Search className={styles.icon} />
			</label>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={close}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className={styles.overlay} />
					</Transition.Child>

					<div className={styles.wrapper}>
						<div className={styles.container}>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className={styles.panel}>
									<input
										value={searchValue}
										onChange={e => setSearchValue(e.target.value)}
										placeholder='Search products'
										className={styles['modal-input']}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
