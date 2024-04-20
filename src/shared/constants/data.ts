import { TypeProductColor, TypeSize } from '@/shared/types'

export const sizes: TypeSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const Colors = {
  BLACK: 'rgb(34, 34, 34)',
  BLUE: 'rgb(0, 148, 255)',
  GREEN: 'rgb(73, 173, 48)',
  WHITE: 'rgb(250, 250, 250)',
  LIGHT_BLUE: 'rgb(210, 219, 224)',
  DARK_GREEN: 'rgb(17, 38, 33)',
  DARK_BLUE: 'rgb(28, 36, 109)',
  BROWN: 'rgb(93, 83, 65)',
  GREY: 'rgb(149, 153, 162)',
  RED: 'rgb(220, 53, 0)',
  BEIGE: 'rgb(229, 201, 159)',
  PINK: 'rgb(230, 174, 201)',
} as const satisfies Record<TypeProductColor, string>;

export const colors = [
  {
    value: 'BLACK',
    color: Colors.BLACK,
    label: 'Colors.Black',
  },
  {
    value: 'BLUE',
    color: Colors.BLUE,
    label: 'Colors.Blue',
  },
  {
    value: 'GREEN',
    color: Colors.GREEN,
    label: 'Colors.Light Green',
  },
  {
    value: 'WHITE',
    color: Colors.WHITE,
    label: 'Colors.White',
  },
  {
    value: 'LIGHT_BLUE',
    color: Colors.LIGHT_BLUE,
    label: 'Colors.Light Blue',
  },
  {
    color: Colors.DARK_GREEN,
    value: 'DARK_GREEN',
    label: 'Colors.Dark Green',
  },
  {
    color: Colors.BROWN,
    value: 'BROWN',
    label: 'Colors.Brown',
  },
  {
    color: Colors.DARK_BLUE,
    value: 'DARK_BLUE',
    label: 'Colors.Dark Blue',
  },
  {
    color: Colors.GREY,
    value: 'GREY',
    label: 'Colors.Grey',
  },
  {
    color: Colors.RED,
    value: 'RED',
    label: 'Colors.Red',
  },
  {
    color: Colors.BEIGE,
    value: 'BEIGE',
    label: 'Colors.Beige',
  },
  {
    color: Colors.PINK,
    value: 'PINK',
    label: 'Colors.Pink',
  },
] as const satisfies {
  value: TypeProductColor;
  label: string;
  color: string;
}[];
