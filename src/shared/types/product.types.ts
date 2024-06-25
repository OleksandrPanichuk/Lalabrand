export type TypeProductColor =
  | 'BLACK'
  | 'BLUE'
  | 'GREEN'
  | 'WHITE'
  | 'LIGHT_BLUE'
  | 'DARK_GREEN'
  | 'BROWN'
  | 'DARK_BLUE'
  | 'GREY'
  | 'RED'
  | 'BEIGE'
  | 'PINK';

export type TypeSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type TypeProductItem = {
  id: string;
  category: string;
  type: string;
  name: string;
  price: number;
  rating: number;
  sizes: { id: string; value: string }[];
  info: { id: string; color: TypeProductColor; images: string[] }[];
};
