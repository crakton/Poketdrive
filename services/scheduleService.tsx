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

export interface DeleteRider {
  rideId: string;
  riderId: string;
}
export interface VerifyRider {
  rideId: string;
  userId: string;
  code: number;
}
export interface StartRide {
  driverID: string;
  rideID: string;
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
export const RequestedRiders = async (id: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `rides/waiting_list?rideId=${id}`,
  };
  const response = await fetch(options);
  return response;
};
export const deleteRider = async (data: DeleteRider) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/remove_rider",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in deleteRide:", error);
  }
};
export const verifyRider = async (data: VerifyRider) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/verify_code",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in Verify Rider:", error);
  }
};
export const startRide = async (data: StartRide) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/start_ride",
    data,
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error("Error in start Ride:", error);
  }
};
export const getRides = async (id: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `rides/user_ride?userId=${id}`,
  };
  const response = await fetch(options);
  return response;
};
