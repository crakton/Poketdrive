import { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";

interface ParcelDelivery {
  senderInfo: {
    sender_name: string;
    sender_phone: string;
    pickupAddress: string;
    pickupTime: string;
    description: string;
  };
  parcelInfo: {
    weight: number;
    dimensions: string;
    category: string;
  };
  receiversInfo: {
    receiversName: string;
    receiversPhone: string;
    receiversAddress: string;
    deliveryTime: string;
    deliveryInstruction: string;
  };
  coupon: boolean;
  costType: "express" | "standard" | "economy";
}

export const sendOrder = async (data: ParcelDelivery) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "water/send_order",
    data,
  };

  const response = await fetch(options);
  return response;
};
