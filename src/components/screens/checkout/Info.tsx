'use client';
import { CheckoutInfo } from '@/components/common';
import { useCheckoutStore } from '@/store';
import { useMemo } from 'react';

export const Info = () => {
  const { novaposhtaData, ukrposhtaData, shippingData, shippingVariant } =
    useCheckoutStore();

  const isActive: boolean = useMemo(() => {
    switch (shippingVariant) {
      case 'standard': {
        return shippingData === null
          ? false
          : Object.keys(shippingData).length === 8 &&
              Object.values(shippingData).every((el) => !!el === true) && shippingData.zipCode?.length === 5;
      }
      case 'novaposhta': {
        return !!novaposhtaData;
      }
      case 'ukrposhta': {
        return !!ukrposhtaData;
      }
    }
  }, [shippingData, shippingVariant, novaposhtaData, ukrposhtaData]);

  return <CheckoutInfo variant="checkout" isActive={isActive} />;
};
