export type TypeOrder = {
  id: string;
  userId: string;
  totalPrice: number;
  shippingFee: number;
  discount: number;
  tax: number;
  shippingId: string;
  createdAt: Date;
  // currency: "UAH" | "USD" | "EUR"
};

export type TypeOrderItem = {
  id: string;
  orderId: string;
  itemId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  count: number;
  image: string;
};
