export type TypeOrderStatus =
  | string
  | 'received'
  | 'processed'
  | 'shipped'
  | 'delivered';

export type TypeOrder = {
  number: number;
  date: string;
  items: { img: string; alt: string }[];
  name: string;
  email: string;
  deliveryMethod: string;
  value: number;
  discounts: number;
  shippingFee: number;
  taxes: number;
  status: TypeOrderStatus;
};
