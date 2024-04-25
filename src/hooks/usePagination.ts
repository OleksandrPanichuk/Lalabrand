import { useState } from 'react'

export function usePagination(totalPages: number, defaultPage:number = 1) {
	const [currentPage, setCurrentPage] = useState<number>(defaultPage)

	function getPageNumbers() {
		const pages = []
		const visiblePages = 1 // Кількість сторінок, які буде видно зліва та справа від поточної сторінки(якщо 1, то зліва від поточної буде одна сторінка та справа одна)
		const totalVisiblePages = 2 * visiblePages + 4

		if (totalPages <= totalVisiblePages ) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			let startPage, endPage
			if (currentPage <= visiblePages + 4) {
				startPage = 1
				endPage = totalVisiblePages 
			} else if (currentPage + visiblePages > totalPages - 4) {
				startPage = totalPages - totalVisiblePages + 1
				endPage = totalPages
			} else {
				startPage = currentPage - visiblePages 
				endPage = currentPage + visiblePages
			}

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i)
			}

			if (startPage > 1) {
				if (startPage > 3) {
					pages.unshift('dots')
				}
				if (startPage !== 2) pages.unshift(2)
				pages.unshift(1)
			}

			if (endPage < totalPages) {
				if (endPage < totalPages - 2) {
					pages.push('dots')
				}
				if (endPage !== totalPages - 1) pages.push(totalPages - 1)
				pages.push(totalPages)
			}
		}

		return pages as ('dots' | number)[]
	}

	return {
		currentPage,
		getPageNumbers,
		goToPage: setCurrentPage,
	}
}

