import { create } from 'zustand';

type ShippingVariant = 'standard' | 'urkposhta' | 'novapochta';
type PaymentMethod = 'card' | 'paypal' | 'receipt';

type StandardShippingData = {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
};

type CardData = {
  name?: string;
  cvc?: number;
  date?: string;
  cardNumber?: string;
};
type ReceiptData = {};
type PaypalData = {};

interface ICheckoutStore {
  shippingVariant: ShippingVariant;
  setShippingVariant: (variant: ShippingVariant) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;

  //Data for standard shipping
  shippingData: StandardShippingData;

  setShippingData: (data: StandardShippingData) => void;

  ukrposhtaData: string | null;

  setUkrposhtaData: (data: string) => void;

  novaposhtaData: string | null;

  setNovaposhtaData: (data: string) => void;

  cardData: CardData;
  setCardData: (data: CardData) => void;

  paypalData: PaypalData;

  setPaypalData: (data: PaypalData) => void;

  receiptData: ReceiptData;

  setReceiptData: (data: ReceiptData) => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
	shippingData: {},
  novaposhtaData: null,
  ukrposhtaData: null,
  cardData: {},
  receiptData: {},
	paypalData:{},

  paymentMethod: 'card',
  shippingVariant: 'standard',

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setShippingVariant: (variant) => set({ shippingVariant: variant }),

  setCardData: (data) =>
    set((state) => ({ cardData: { ...state.cardData, ...data } })),
  setPaypalData: (data) => set({ paypalData: data }),
  setReceiptData: (data) => set({ receiptData: data }),

  setNovaposhtaData: (data) => set({ novaposhtaData: data }),
  setShippingData: (data) =>
    set((state) => ({ shippingData: { ...state.shippingData, ...data } })),
  setUkrposhtaData: (data) => set({ ukrposhtaData: data }),
}));
