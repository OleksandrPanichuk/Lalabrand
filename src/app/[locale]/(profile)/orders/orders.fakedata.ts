import { favoritesFromBackend } from '../../wishlist/wishlist.fakeData';

const items = [...favoritesFromBackend];
items.forEach((el, i) => (el.color = favoritesFromBackend[i].colors[0]));

export const currentOrders = [
  {
    id: 'string',
    user_id: 'string',
    total_price: 37.98,
    shipping_fee: 4.99,
    created_at: new Date('27/04/2024'),
    // currency: "UAH" | "USD" | "EUR"
    number: 44774030953,
    items,
    deliveryMethod: 'Nova Poshta post office #23, Kyiv, 92809',
    status: 'received',
  },
];

export const pastOrders = [
  {
    id: 'string2',
    user_id: 'string',
    total_price: 37.98,
    shipping_fee: 4.99,
    created_at: new Date('12/02/2024'),
    number: 43274035437,
    items: items.slice(0, 2),
    deliveryMethod: 'Nova Poshta post office #23, Kyiv, 92809',
    status: 'delivered',
  },
];
