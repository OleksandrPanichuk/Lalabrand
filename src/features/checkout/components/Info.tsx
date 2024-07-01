'use client';
import { CheckoutInfo, useCheckoutStore } from '@/features/checkout';
import { cardShippingSchema, standardShippingSchema } from '@/shared/schemas';
import { useMemo } from 'react';

export const Info = () => {
  const {
    novaposhtaData,
    ukrposhtaData,
    shippingData,
    shippingVariant,
    cardData,
    paymentMethod,
  } = useCheckoutStore();

  const isShippingActive: boolean = useMemo(() => {
    switch (shippingVariant) {
      case 'standard': {
        return standardShippingSchema.safeParse(shippingData).success;
      }
      case 'novaposhta': {
        return !!novaposhtaData;
      }
      case 'ukrposhta': {
        return !!ukrposhtaData;
      }
    }
  }, [shippingData, shippingVariant, novaposhtaData, ukrposhtaData]);

  const isPaymentActive: boolean = useMemo(() => {
    if (paymentMethod === 'paypal' || paymentMethod === 'receipt') return true;

    return cardShippingSchema.safeParse(cardData).success;
  }, [paymentMethod, cardData]);

  const isActive = isShippingActive && isPaymentActive;

  return <CheckoutInfo variant="checkout" isActive={isActive} />;
};
