import { z } from "zod"
import { defaultShippingInfoSchema } from "@/features/checkout"

export type TypeUser = {
  id: string;
  email: string;

  bonus?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
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