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
  sizes: { id: string; value: TypeSize }[];
  info: { id: string; color: TypeProductColor; images: string[] }[];


  description?: {
    longDescription?: string
    modelSize?:string 
    length?: string
    sleeveLength?:string 
    fit?:string
    neckline?:string
  }

  materials?:{
    description?:string
    material?:string
    composition?:string
  }

  careGuide?: {
    instructions?: string[]
    description?:string
  }





  customerOpinions?: {
    description:string
    tags: string[]
  }


  reviews: {
    user: {
      firstName:string
      lastName:string
    }
    text:string
    rating:number
    id: string
  }[]
};
