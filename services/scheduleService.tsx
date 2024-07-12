import axios, { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";

export interface Schedule {
  origin: string;
  destination: string;
  stops: string[];
  type: string;
  other: string;
  price: number;
  brs: number;
  departure_time: string;
  total_capacity: string;
  remaining_capacity: string;
  creator: string;
  riders: string[];
  luggage_type: string;
  carName: string;
  carColor: string;
  carNumber: string;
}
export interface ManageRide {
  email: string;
}
export interface DeleteRide {
  id: string;
}

export const createRide = async (data: Schedule) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/book_ride",
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error in createRide:", error);
    throw error;
  }
};
export const manageRide = async (data: ManageRide) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/driver_rides",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in manageRide:", error);
  }
};
export const deleteRide = async (data: DeleteRide) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/delete_ride",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in deleteRide:", error);
  }
};
