export type TypeRewardsOrder = {
  id: string;
  createdAt: Date;
  totalPrice: number;
  items: {
    id: string;
    image: string;
  }[];
};

export const orders: TypeRewardsOrder[] = [
  {
    id: '44774030953',
    createdAt: new Date('2024-03-27'),
    totalPrice: 38,
    items: [
      {
        id: '1',
        image: '/imgDelete/fav-1.jpg',
      },
      {
        id: '2',
        image: '/imgDelete/fav-2.jpg',
      },
    ],
  },
  {
    id: '44774030952',
    createdAt: new Date('2024-02-12'),
    totalPrice: 22,
    items: [
      {
        id: '1',
        image: '/imgDelete/fav-1.jpg',
      },
      {
        id: '2',
        image: '/imgDelete/fav-2.jpg',
      },
      {
        id: '3',
        image: '/imgDelete/fav-3.jpg',
      },
    ],
  },
];
