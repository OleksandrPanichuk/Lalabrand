import { ReactNode } from "react"

export type TypeItem = {
	key:string
	href: string
	value:string
}



export interface ICategoriesDisclosureItemProps {
	data: TypeItem[]
	href: string
	children: ReactNode
	group:"women"|"kids"|"men"|"accessories"
}