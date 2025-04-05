import { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";
import { SendFormState } from "../redux/features/waterSendSlice";

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

export const sendOrder = async (data: SendFormState) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "water/send_order",
    data,
  };

  const response = await fetch(options);
  return response;
};
export const getCouponRate = async (kg: number, coupon: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `water/get_rate_coupon/${kg}kg/${coupon}`,
  };
  const response = await fetch(options);
  return response;
};
export const getRate = async (kg: number) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `water/get_rate/${kg}kg`,
  };
  const response = await fetch(options);
  return response;
};
export const getOrderFrom = async () => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `water/get_order_from`,
  };
  const response = await fetch(options);
  return response;
};
export const getOrderTo = async () => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `water/get_order_to`,
  };
  const response = await fetch(options);
  return response;
};
