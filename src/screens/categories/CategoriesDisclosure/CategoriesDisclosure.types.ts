import { ReactNode } from "react"

export type TypeItem = {
	key:string
	href: string
}


export interface ICategoryDisclosureItemProps {
	data: TypeItem[]
	href: string
	children: ReactNode
}