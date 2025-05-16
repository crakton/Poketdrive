import { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";

export interface WalletPayment {
  userId: string;
  amount: number;
  email: string;
}
export const walletPayment = async (data: WalletPayment) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://urideserver-fgfm.onrender.com/api/v1/wallet/initialize_payment",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in funding wallet:", error);
    throw error;
  }
};

export const walletDetails = async (id: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `wallet/wallet_details?userId=${id}`,
  };
  const response = await fetch(options);
  return response;
};
export const walletHistory = async (id: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `wallet/transaction_history?userId=${id}`,
  };
  const response = await fetch(options);
  return response;
};
