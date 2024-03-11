import { create } from 'zustand'

interface IConfirmModalData {
	title: string
	description: string
	buttonText:string
	isLoading?: boolean
	onConfirm?: () => void | Promise<void>
}

interface IConfirmModalStore extends IConfirmModalData {
	isOpen: boolean
	onOpen: (data?: Partial<IConfirmModalData>) => void
	onClose: () => void
}

const defaultData: Omit<IConfirmModalData, 'onConfirm'> = {
	title: 'Confirm Modal.Title',
	description: 'Confirm Modal.Description',
	buttonText:'Confirm Modal.Button'
}

export const useConfirmModal = create<IConfirmModalStore>(set => ({
	isOpen: false,
	onClose: () => set({ isOpen: false, ...defaultData }),
	onOpen: (data = {}) => set({ isOpen: true, ...data }),
	...defaultData,
}))