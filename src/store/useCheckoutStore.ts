import { PaymentMethod, ShippingVariant } from '@/shared/types'
import { create } from 'zustand';


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
  cvc?: string;
  date?: string;
  cardNumber?: string;
};

interface ICheckoutStore {
  shippingVariant: ShippingVariant;
  setShippingVariant: (variant: ShippingVariant) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;

  //Data for standard shipping
  shippingData: StandardShippingData | null;

  setShippingData: (data: StandardShippingData) => void;

  ukrposhtaData: string | null;

  setUkrposhtaData: (data: string) => void;

  novaposhtaData: string | null;

  setNovaposhtaData: (data: string) => void;

  cardData: CardData | null;
  setCardData: (data: CardData) => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
	shippingData: null,
  novaposhtaData: null,
  ukrposhtaData: null,
  cardData: null,

  paymentMethod: 'card',
  shippingVariant: 'standard',

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setShippingVariant: (variant) => set({ shippingVariant: variant }),

  setCardData: (data) =>
    set((state) => ({ cardData: { ...state.cardData, ...data } })),

  setNovaposhtaData: (data) => set({ novaposhtaData: data }),
  setShippingData: (data) =>
    set((state) => ({ shippingData: { ...state.shippingData, ...data } })),
  setUkrposhtaData: (data) => set({ ukrposhtaData: data }),
}));
