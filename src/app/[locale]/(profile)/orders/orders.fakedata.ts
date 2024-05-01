import { favoritesFromBackend } from '../../wishlist/wishlist.fakeData';

export const currentOrders = [
  {
    number: 44774030953,
    date: '27/03/2024',
    items: favoritesFromBackend,
    name: 'Yuliia Oscar',
    email: 'yuliiaoscar@gmail.com',
    deliveryMethod: 'Nova Poshta post office #23, Kyiv, 92809',
    value: 32.99,
    discounts: 0,
    shippingFee: 4.99,
    taxes: 0,
    status: 'received',
  },
];

export const pastOrders = [
  {
    number: 43274035437,
    date: '12/02/2024',
    items: favoritesFromBackend.slice(0, 2),
    name: 'Yuliia Oscar',
    email: 'yuliiaoscar@gmail.com',
    deliveryMethod: 'Nova Poshta post office #23, Kyiv, 92809',
    value: 32.99,
    discounts: 0,
    shippingFee: 4.99,
    taxes: 0,
    status: 'delivered',
  },
];
