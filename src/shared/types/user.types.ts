import { z } from "zod"
import { defaultShippingInfoSchema } from "@/shared/schemas"

export type TypeUser = {
  id: string;

  bonus?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  phone?: string;
  // language: 'ua' | 'en';
  createdAt: Date;
};

export type TypeAddress = {
  id: string;
	
  address1?: string;
  address2?: string;
  city?: string;
  zipCode?: string;
  country?: string;


	userId:string
};



export type TypeDefaultShippingData = z.infer<typeof defaultShippingInfoSchema>