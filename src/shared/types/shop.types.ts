import { TypeProductColor, TypeSize } from "./product.types"

export type TypeSortBy = 'newest' | 'recommended' | 'price-lowest' | 'price-highest'


export type TypeShopItem = {
  id: string;
  title: string;
	image:string
	price:number
	sizes: {
		id:string
		value: TypeSize
	}[]

  info: {
    id: string;
    color: TypeProductColor;
		image:string
  }[];
};