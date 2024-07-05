import { TypeProductItem } from '@/shared/types';

export const fakeProductData: TypeProductItem = {
  id: '1011890020',
  category: 'women',
  type: 'dresses',
  name: 'Tiered-skirt Smocked Dress',

  price: 27.99,
  rating: 4.8,

  sizes: [
    {
      id: '1',
      value: 'XS',
    },
    {
      id: '2',
      value: 'S',
    },
    {
      id: '3',
      value: 'M',
    },
    {
      id: '4',
      value: 'L',
    },
    {
      id: '5',
      value: 'XL',
    },
    {
      id: '6',
      value: 'XXL',
    },
  ],

  info: [
    {
      id: '1',
      color: 'BEIGE',
      images: [
        '/images/product/slider-1.png',
        '/images/product/slider-2.png',
        '/images/product/slider-3.png',
        '/images/product/slider-4.png',
      ],
    },
    {
      id: '2',
      color: 'BLACK',
      images: [
        '/images/shop-mock/1.jpg',
        '/images/shop-mock/2.jpg',
        '/images/shop-mock/3.jpg',
      ],
    },
    {
      id: '3',
      color: 'GREEN',
      images: [
        '/images/shop-mock/1.jpg',
        '/images/shop-mock/2.jpg',
        '/images/shop-mock/3.jpg',
        '/images/shop-mock/4.jpg',
        '/images/shop-mock/5.jpg',
        '/images/shop-mock/6.jpg',
        '/images/shop-mock/7.jpg',
        '/images/shop-mock/8.jpg',
        '/images/shop-mock/9.jpg',
      ],
    },
  ],

  description: {
    longDescription:
      'Fitted tank top in soft, ribbed jersey. Scoop neck at front and back.',
    modelSize: `Model size: The model is 178cm/5'10" and wears a size S`,
    length: 'Regular length',
    sleeveLength: 'Sleeveless',
    fit: 'Slim fit',
    neckline: 'Neckline: Low-cut Neckline, Round Neck',
  },

  materials: {
    composition: 'Polyester 68%, Rayon 30%, Spandex 2%',
    material: 'Jersey',
    description:
      'Polyester is a synthetic fiber made from crude oil (a fossil resource).Viscose is a regenerated cellulose fiber commonly made from wood, but the raw material could also consist of other cellulosic materials. Elastane is an elastic synthetic fiber made from oil (a fossil resource).',
  },

  careGuide: {
    description:
      'You too can help the environment and make fashion more sustainable. Bring unwanted clothes or home textiles to any H&M store and they will be reworn, reused or recycled.',
    instructions: [
      'Only non-chlorine bleach when needed',
      'Medium iron',
      'Machine wash cool',
      'Line dry',
      'Can be dry cleaned',
    ],
  },

  customerOpinions: {
    description:
      "Customers like the comfort and appearance of the dress. For example, they mention it's super comfortable, cute, and flattering. That said some complain about the color being off. Opinions are mixed on quality, transparency, and fit.",
    tags: ['Comfortable', 'True size', 'Style', 'Price'],
  },
  reviews: [
    {
      user: {
        firstName: 'Jane',
        lastName: 'Tutor',
      },
      text: "I love this dress! The design is elegant and flattering, with beautiful unique neckline. The biege is vibrant and true to the photos. The material is soft and comfortable, and the fit is perfect. It's well-made with high-quality stitching. I've worn it to several events and always get compliments. Highly recommend this versatile and stylish dress!",
      rating: 5.0,
      id: '1',
    },
    {
      user: {
        firstName: 'Lora',
        lastName: 'Kim',
      },
      text: 'The material is soft and comfortable, and the fit is good. It’s well-made with high-quality stitching. However, the zipper can be a bit tricky to pull up. I’ve worn it to several events and received many compliments. A great choice for a versatile and stylish dress. Four stars!',
      rating: 4.0,
      id: '2',
    },
  ],
};

type TypeItem = {
  id: string;
  name: string;
  path: string;
  colors: string[];
  price: number;
};

export const fakeStyleWithData: TypeItem[] = [
  {
    id: '1',
    name: 'Bouclé Jacket',
    path: '/images/product/style-1.jpeg',
    price: 44.99,
    colors: ['beige'],
  },
  {
    id: '2',
    name: 'Intertwined Hoop Earrings',
    path: '/images/product/style-2.jpeg',
    price: 8.99,
    colors: ['beige'],
  },
  {
    id: '3',
    name: 'Straw Shopper',
    path: '/images/product/style-3.jpeg',
    price: 22.99,
    colors: ['beige'],
  },
  {
    id: '4',
    name: 'Chunky Platform Sandals',
    path: '/images/product/style-4.jpeg',
    price: 37.99,
    colors: ['black'],
  },
];
export const fakeSimilarProductsData: TypeItem[] = fakeStyleWithData
