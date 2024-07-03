export type TypeOrderStatus =
  | string
  | 'received'
  | 'processed'
  | 'shipped'
  | 'delivered';

export type TypeOrderItem = {
  id?: string;
  order_id: string;
  item_id?: string;
  title: string;
  size: string;
  color: string;
  price: number;
  count: number;
  image: string;
};

export type TypeOrder = {
  id?: string;
  user_id: string;
  total_price: number;
  shipping_fee: number;
  discount?: number;
  tax?: number;
  shipping_id?: string;
  created_at: Date;
  // currency: "UAH" | "USD" | "EUR"
  number?: number;
  items: TypeOrderItem[];
  deliveryMethod?: string;
  status?: TypeOrderStatus;
};
