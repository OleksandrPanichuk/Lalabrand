"use client"
import { useCallback, useState } from 'react'

export function useDisclosure(
	initialState = false,
	callbacks?: { onOpen?: () => void; onClose?: () => void }
) {
	const { onOpen, onClose } = callbacks || {}
	const [isOpen, setIsOpen] = useState<boolean>(initialState)

	const open = useCallback(() => {
		setIsOpen(isOpened => {
			if (!isOpened) {
				onOpen?.()
				return true
			}
			return isOpened
		})
	}, [onOpen])

	const close = useCallback(() => {
		setIsOpen(isOpened => {
			if (isOpened) {
				onClose?.()
				return false
			}
			return isOpened
		})
	}, [onClose])

	const toggle = useCallback(() => {
		isOpen ? close() : open()
	}, [close, open, isOpen])

	return { open, close, toggle, isOpen } as const
}
