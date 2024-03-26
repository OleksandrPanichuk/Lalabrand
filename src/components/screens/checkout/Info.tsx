'use client';
import { CheckoutInfo } from '@/components/common';
import { useCheckoutStore } from '@/store';
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
        return shippingData === null
          ? false
          : Object.keys(shippingData).length === 8 &&
              Object.values(shippingData).every((el) => !!el === true) &&
              shippingData.zipCode?.length === 5;
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

    return (
      cardData !== null &&
      Object.keys(cardData).length === 4 &&
      Object.values(cardData).every((el) => !!el === true) &&
      cardData.cvc?.length === 3 &&
      cardData.date?.length === 5 &&
      cardData.cardNumber?.length === 19 &&
      +cardData.date.split('/')[0] > 0 &&
      +cardData.date.split('/')[0] <= 31
    );
  }, [paymentMethod, cardData]);

  const isActive = isShippingActive && isPaymentActive;

  return <CheckoutInfo variant="checkout" isActive={isActive} />;
};
