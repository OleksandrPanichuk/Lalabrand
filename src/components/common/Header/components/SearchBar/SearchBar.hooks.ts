import { RefObject, useEffect } from 'react'

export const useClickOutside = (
	ref: RefObject<HTMLDivElement>,
	labelRef: RefObject<HTMLLabelElement>,
	callback: () => void
) => {
	const handleClick = (e: MouseEvent) => {
		if (
			ref.current &&
			!ref.current.contains(e.target as HTMLElement) &&
			labelRef.current &&
			!labelRef.current.contains(e.target as HTMLElement)
		) {
			callback()
		}
	}
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}
